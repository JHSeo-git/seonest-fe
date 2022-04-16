import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import uploadImage from '@/lib/api/upload/uploadImage';

export default function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const { open } = useAppModalActions();

  const upload = useCallback(
    async ({ file, type }: { file: File; type: string }) => {
      try {
        if (!file.type.includes('image')) {
          const e = new Error('Not image file');
          e.name = 'NotImageFile';
          throw e;
        }
        if (file.size > 1024 * 1024 * 15) {
          const e = new Error('Image is too big');
          e.name = 'FileSizeBig';
          throw e;
        }

        setLoading(true);
        const uploadInfo = await uploadImage({ type, filename: file.name });

        const { image_path, signed_url } = uploadInfo;

        if (!image_path) {
          const e = new Error('Failed upload thumbnail image');
          e.name = 'FailUploadThumbnail';
          throw e;
        }

        await axios.put(signed_url, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        setImageUrl(image_path);

        return image_path;
      } catch (e) {
        toast.error(`Image Upload Error: ${e}`);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    upload,
    imageUrl,
  };
}
