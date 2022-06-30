import Link from 'next/link';
import Image from 'next/future/image';
import { styled } from '@stitches.js';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

import { Post } from '@/helpers/api/posts/types';
import { humanizeTime } from '@/utils/viewerUtils';
import { useUserValue } from '@/helpers/recoil/authState';
import { stringToDateMoreDetail } from '@/utils/dateUtils';
import useDeletePost from '@/hooks/useDeletePost';

import Button from '../Button';
import Popup from '../Popup';

import { ReactComponent as EyeIcon } from '@/assets/icons/eye.svg';
import { ReactComponent as CubeIcon } from '@/assets/icons/cube.svg';
import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg';
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg';

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

  const categories = useMemo(() => {
    if (!post.categories) return null;
    return post.categories.sort((a, b) => (a.name > b.name ? 1 : -1));
  }, [post]);

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
          {post.read_time ? (
            <>
              <Seperator />
              <WithIcon color="pink">
                <ClockIcon className="icon" />
                <span className="text">{humanizeTime(post.read_time)}</span>
              </WithIcon>
            </>
          ) : null}
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
        {categories && categories.length > 0 && (
          <SubInfo>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.url_slug}`}
                passHref
              >
                <CategoryBox>{category.name}</CategoryBox>
              </Link>
            ))}
          </SubInfo>
        )}
        {post.thumbnail && (
          <ImageWrapper>
            <StyledImage
              src={post.thumbnail}
              alt="thumbnail"
              width={768}
              height={500}
              priority={true}
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

const CategoryBox = styled('a', {
  px: '$3',
  py: '$2',
  br: '$2',
  bc: '$blue4',
  fontSize: '$sm',
  fontWeight: 'bold',
  lineHeight: '1',
  color: '$blue11',

  '@hover': {
    '&:hover': {
      bc: '$blue5',
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
  mb: '$6',
});

const StyledImage = styled(Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default PostHeader;
