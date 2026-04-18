const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = () =>{
  cloudinary.config({
    cloud_name: "db9bgltez",
    api_key: "216433435146552",
    api_secret: "YItYLjTiLCPMVorpw4mxBLq_7yA",
  });
}


  module.exports = cloudinaryConfig;