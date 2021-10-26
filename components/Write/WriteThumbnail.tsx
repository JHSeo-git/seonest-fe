import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import EmptyImage from '@/assets/images/undraw-empty.svg';
import useUploadImage from '@/hooks/useUploadImage';
import { styled } from '@stitches.js';
import Button from '../common/Button';
import PlusIcon from '@/assets/icons/plus.svg';

export type WriteThumbnailProps = {
  thumbnailUrl?: string;
  handleThumbnailUrl: (url: string | undefined) => void;
};

const WriteThumbnail = ({
  thumbnailUrl,
  handleThumbnailUrl,
}: WriteThumbnailProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { upload } = useUploadImage();
  const [localThumbnailUrl, setLocalThumbnailUrl] = useState(thumbnailUrl);
  // const [thumbnailUrl, setThumbnailUrl] = usePostThumbnailUrlState();

  const onClick = () => {
    if (!ref.current) return;
    ref.current?.click();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      const targetFile = e.target.files[0];
      const imageUrl = await upload({ type: 'post', file: targetFile });
      if (!imageUrl) {
        return;
      }
      setLocalThumbnailUrl(imageUrl);
      handleThumbnailUrl(imageUrl);
    }
  };

  const onRemove = () => {
    setLocalThumbnailUrl(undefined);
    handleThumbnailUrl(undefined);
  };

  useEffect(() => {
    if (!localThumbnailUrl) return;
    handleThumbnailUrl(localThumbnailUrl);
  }, [localThumbnailUrl, handleThumbnailUrl]);

  return (
    <>
      {localThumbnailUrl ? (
        <ImageWrapper>
          <Image
            className="image-thumbnail"
            src={localThumbnailUrl}
            alt="thumbnail"
            layout="fill"
            placeholder="empty"
            objectFit="cover"
          />
          <UpdateButton kind="blueScale" onClick={onRemove}>
            REMOVE
          </UpdateButton>
        </ImageWrapper>
      ) : (
        <ImageWrapper placeholder>
          <EmptyImage className="image-placeholder" />
          <IconButton
            kind="blueScale"
            size="large"
            shape="round"
            onClick={onClick}
          >
            <PlusIcon className="icon" />
          </IconButton>
          <HiddenInput
            ref={ref}
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </ImageWrapper>
      )}
    </>
  );
};

const ImageWrapper = styled('div', {
  position: 'relative',
  height: '15rem',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  jc: 'center',
  ai: 'center',
  py: '$3',
  mb: '$3',
  br: '$3',
  bc: '$mauve3',

  '& .image-placeholder': {
    width: '100%',
    height: 'auto',
  },

  variants: {
    placeholder: {
      true: {
        bc: 'transparent',
        border: '3px dashed $colors$mauve3',
      },
    },
  },
});

const IconButton = styled(Button, {
  position: 'absolute',
  right: '15px',
  bottom: '15px',
  height: '2.25rem',
  width: '2.25rem',
  p: 0,
  display: 'flex',
  jc: 'center',
  ai: 'center',

  '& .icon': {
    size: '15px',
  },
});

const UpdateButton = styled(Button, {
  position: 'absolute',
  right: '15px',
  bottom: '15px',
});

const HiddenInput = styled('input', {
  display: 'none',
});

export default WriteThumbnail;
