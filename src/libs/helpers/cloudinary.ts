import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File) => {
  try {
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "profile_images",
    });
    return result.secure_url; // This is the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
      folder: "profile_images",
    });
    return result.secure_url; // This is the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
