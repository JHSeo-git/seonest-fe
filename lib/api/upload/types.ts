export type UploadImageUrl = {
  image_path: string;
  signed_url: string;
};

export type UploadImagePayload = {
  type: string;
  filename: string;
};
