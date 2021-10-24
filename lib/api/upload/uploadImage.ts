import client from '../client';
import { UploadImagePayload, UploadImageUrl } from './types';

export default async function uploadImage({
  type,
  filename,
}: UploadImagePayload) {
  const response = await client.post<UploadImageUrl>(
    '/api/upload/image/create-upload-url',
    {
      type,
      filename,
    }
  );

  return response.data;
}
