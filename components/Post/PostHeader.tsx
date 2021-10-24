import React, { useState } from 'react';
import Image from 'next/image';
import { Post } from '@/lib/api/posts/types';
import { useUserValue } from '@/lib/recoil/authState';
import { stringToDateMoreDetail } from '@/lib/utils/dateUtils';
import { humanizeTime } from '@/lib/utils/viewerUtils';
import useDeletePost from '@/hooks/useDeletePost';
import { useRouter } from 'next/router';
import { styled } from '@stitches.js';
import Button from '../common/Button';
import CalendarIcon from '@/assets/icons/calendar.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import EyeIcon from '@/assets/icons/eye.svg';
import Popup from '../common/Popup';

export type PostHeaderProps = {
  post: Post;
};

function PostHeader({ post }: PostHeaderProps) {
  const router = useRouter();
  const userState = useUserValue();
  const { deletePost } = useDeletePost();

  const [visiblePopup, setVisiblePopup] = useState(false);
  const onOK = async (slug: string) => {
    await deletePost(slug);
    setVisiblePopup(false);
    router.back();
  };

  // TODO: Image blur placeholder lib 사용해보기

  return (
    <>
      <Box>
        <Title>{post.title}</Title>
        <SubInfo>
          <WithIcon>
            <CalendarIcon className="icon" />
            <span className="text">
              {stringToDateMoreDetail(post.created_at)}
            </span>
          </WithIcon>
          {post.read_time && (
            <>
              <Seperator />
              <WithIcon color="pink">
                <ClockIcon className="icon" />
                <span className="text">{humanizeTime(post.read_time)}</span>
              </WithIcon>
            </>
          )}
          <Seperator />
          <WithIcon>
            <EyeIcon className="icon" />
            <span className="text">
              {post.read_count ?? 0} view
              {post.read_count && post.read_count > 1 && 's'}
            </span>
          </WithIcon>
          {userState && (
            <Button
              kind="redScale"
              size="small"
              onClick={() => setVisiblePopup(true)}
              style={{ marginLeft: 'auto' }}
            >
              DELETE
            </Button>
          )}
        </SubInfo>
        {post.thumbnail && (
          <ImageWrapper>
            <Image
              src={post.thumbnail}
              alt="thumbnail"
              width={768}
              height={500}
              placeholder={'blur'}
              blurDataURL={post.thumbnail}
              objectFit="contain"
            />
          </ImageWrapper>
        )}
      </Box>
      <Popup
        visible={visiblePopup}
        title="Delete Post?"
        onCancel={() => setVisiblePopup(false)}
        onOK={() => onOK(post.url_slug)}
        openDelay={false}
      />
    </>
  );
}

const Box = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  my: '$4',
  px: '$1',
});

const Title = styled('h1', {
  m: 0,
  mb: '$3',
  pb: '$3',
  fontSize: '$4xl',
  color: '$hiContrast',
  borderBottom: '1px solid $mauve6',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',

  '@sm': {
    fontSize: '$5xl',
  },
});

const SubInfo = styled('div', {
  display: 'flex',
  ai: 'center',
  mb: '$6',
  flexWrap: 'wrap',
  gap: '$1',
});

const WithIcon = styled('div', {
  display: 'flex',
  ai: 'center',
  color: '$mauve11',

  '& .icon': {
    size: '$3',
    color: 'inherit',
  },
  '& .text': {
    m: 0,
    ml: '$1',
    fontSize: '$xs',
    color: 'inherit',
  },

  variants: {
    color: {
      pink: {
        color: '$pink9',
      },
    },
  },
});

const Seperator = styled('div', {
  height: '$3',
  width: '1px',
  bc: '$mauve6',
});

const ImageWrapper = styled('div', {
  position: 'relative',
  mx: 'auto',
  mb: '$6',
});

export default PostHeader;
