const cloudinaryConfig = {
  name: "grubuddy",
  apiKey: "392893968492293",
  apiSecret: "5RWaH6yI8oExTJ1Kf3CaWgVF_Is",
  databaseURL: "https://res.cloudinary.com/grubuddy",
  APIURL: "https://api.cloudinary.com/v1_1/grubuddy/image/upload",
  uploadPreset: "pkb1dqog",
  userUrl:
    "https://res.cloudinary.com/grubuddy/image/upload/v1558967695/TMWTP/user.png"
};

export const upload = async dataUri => {
  let base64Img = `data:image/jpg;base64,${dataUri}`;

  //Add your cloud name
  let apiUrl = cloudinaryConfig.APIURL;

  let data = {
    file: base64Img,
    upload_preset: cloudinaryConfig.uploadPreset
  };

  return fetch(apiUrl, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    },
    method: "POST"
  })
    .then(async r => {
      let data = await r.json();
      return Promise.resolve(data.secure_url);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export default cloudinaryConfig;
