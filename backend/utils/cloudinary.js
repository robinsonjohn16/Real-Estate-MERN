import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
   cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   try {
      if (!localFilePath) return null;
      const response = await cloudinary.uploader
         .upload(localFilePath)
         .catch((error) => {
            console.log(error);
         });
      console.log("File Uploaded", response.url);
      return response;
   } catch (error) {
      fs.unlinkSync(localFilePath); //Removes the local file which is unsaved in cloudinary
      return null;
   }
};

export { uploadOnCloudinary };
