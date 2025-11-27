"use server";

import cloudinary from "../config/cloudinary";

interface CloudinarySignatureParams {
  folder?: string;
  public_id?: string;
  upload_preset: string;
}

export async function generateSignature(params: CloudinarySignatureParams) {

  const timestamp = Math.round((new Date).getTime() / 1000);
  
  const signature = cloudinary.utils.api_sign_request(
    {
      folder:params.folder, 
      timestamp,
      source: 'uw',
      upload_preset: params.upload_preset
    },
    process.env.CLOUDINARY_API_SECRET!,
  );

  return {timestamp, signature}
}
