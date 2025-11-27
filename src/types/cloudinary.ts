// The shape of the actual file data when upload is successful
interface CloudinaryUploadWidgetInfo {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  thumbnail_url: string;
}

// The shape of the main result object
interface CloudinaryUploadWidgetResults {
  event: "success" | "close" | "queues-end" | string;
  info: CloudinaryUploadWidgetInfo | string;
}