import CryptoJS from 'crypto-js';

const uploadImage = (uri, cb) => {
  let timestamp = (Date.now() / 1000 | 0).toString();
  let api_key = '392893968492293'
  let api_secret = '5RWaH6yI8oExTJ1Kf3CaWgVF_Is'
  let cloud = 'grubuddy'
  let hash_string = 'timestamp=' + timestamp + api_secret
  let signature = CryptoJS.SHA1(hash_string).toString();
  let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

  let xhr = new XMLHttpRequest();
  xhr.open('POST', upload_url);
  xhr.onload = () => {
    cb(JSON.parse(xhr._response).url);
  };
  let formdata = new FormData();
  formdata.append('file', {uri: uri, type: 'image/png', name: 'upload.png'});
  formdata.append('timestamp', timestamp);
  formdata.append('api_key', api_key);
  formdata.append('signature', signature);
  xhr.send(formdata);
};

export default uploadImage;