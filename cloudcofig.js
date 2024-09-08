const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

 cloudinary.config=({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_securit:process.env.CLOUD_API_SECRAT
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Wanderlust_dev',
      allowFormate:["png","jpg","jpeg"],
    },
  });
  module.exports={cloudinary,storage};