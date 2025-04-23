import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000, // 60 seconds
});

export function uploadToCloudinary(file) {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "fileuploader"
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          // console.log("Cloudinary upload result:", result);
          resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });
  } catch (error) {
    console.log("Upload to cloudinary error", error);
    throw error;
  }
}

export async function deleteFronCloudinary(file) {
  await cloudinary.uploader.destroy(file.publicId, {
    resource_type: "raw",
  });
}