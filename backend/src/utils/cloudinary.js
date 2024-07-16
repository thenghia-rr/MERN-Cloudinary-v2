import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadOptions = {
            folder: 'cloudinary_demo', // Specify the folder name here
        };

        let stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
  

export {uploadToCloudinary, deleteFromCloudinary};
