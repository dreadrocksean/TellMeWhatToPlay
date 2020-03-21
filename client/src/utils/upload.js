import CryptoJS from 'crypto-js';
import { FileSystem, } from 'expo';

export default uri => {
  const timestamp = (Date.now() / 1000 | 0).toString();
  const api_key = '392893968492293';
  const api_secret = '5RWaH6yI8oExTJ1Kf3CaWgVF_Is';
  const cloud = 'grubuddy';
  const hash_string = 'timestamp=' + timestamp + api_secret;
  const signature = CryptoJS.SHA1(hash_string).toString();
  const upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload';
  const file = `${FileSystem.documentDirectory}photos/${uri}`;

  const formdata = new FormData();
  formdata.append('file', {uri: file, type: 'image/png', name: 'upload.png'});
  formdata.append('timestamp', timestamp);
  formdata.append('api_key', api_key);
  formdata.append('signature', signature);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(formdata);
  });
};