"use server";

import cloudinary from "../config/cloudinary";

interface CloudinarySignatureParams {
  timestamp: number;
  folder?: string;
  public_id?: string;
  upload_preset?: string;
}

export async function generateSignature(params: CloudinarySignatureParams) {
  return cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  );
}
