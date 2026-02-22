
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv"

dotenv.config({
    path: ".env",
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);


const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", 
    });

    fs.unlinkSync(localFilePath); 

    console.log("file is uploaded successfully on cloudinary", response.url);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); 
    return null;
  }
};


const deleteFromCloudinary = async(publicId) => {
  try {
    if(!publicId) {
      return;
    }

    const response  = await cloudinary.uploader.destroy(publicId);
    return response;

  }
  catch(error ) {
    console.log("Error while delete from Cloudinary", error);
    return
  }
}


export {uploadOnCloudinary,deleteFromCloudinary}