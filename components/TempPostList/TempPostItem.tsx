import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import markdownToText from 'markdown-to-text';
import { styled } from '@stitches.js';
import { Post } from '@/lib/api/posts/types';
import { getDiffOfNow } from '@/lib/utils/dateUtils';
import { useUserValue } from '@/lib/recoil/authState';
import useDeletePost from '@/hooks/useDeletePost';
import Button from '../common/Button';
import CalendarIcon from '@/assets/icons/calendar.svg';
import Popup from '../common/Popup';

export type TempPostItemProps = {
  post: Post;
};

function TempPostItem({ post }: TempPostItemProps) {
  const userState = useUserValue();
  const router = useRouter();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const { deletePost } = useDeletePost();
  const onOK = async (slug: string) => {
    await deletePost(slug);
    setVisiblePopup(false);
    router.reload();
  };

  return (
    <TempItemBox>
      <Link href={`/write/${post.url_slug}`} passHref>
        <LinkBox>
          <ContentInfo>
            <CalendarIcon className="icon" />
            <span className="text">{getDiffOfNow(post.updated_at)}</span>
          </ContentInfo>
          <h3 className="title">{post.title}</h3>
          <p className="description">
            {post.body.length > 150
              ? `${markdownToText(post.body).trim().slice(0, 150)}...`
              : post.body}
          </p>
        </LinkBox>
      </Link>
      {userState && (
        <Button
          size="small"
          kind="redScale"
          ghost
          css={{
            position: 'absolute',
            right: '1rem',
            bottom: '1rem',
          }}
          onClick={() => setVisiblePopup(true)}
        >
          DELETE
        </Button>
      )}
      <Popup
        visible={visiblePopup}
        title="Delete Temp Post?"
        onCancel={() => setVisiblePopup(false)}
        onOK={() => onOK(post.url_slug)}
        openDelay={false}
      />
    </TempItemBox>
  );
}

const TempItemBox = styled('li', {
  position: 'relative',
  '&:not(:last-child)': {
    borderBottom: '1px solid $colors$mauve6',
  },
  py: '$6',
});

const LinkBox = styled('a', {
  overflow: 'hidden',
  height: '4.5rem',

  display: 'flex',
  flexDirection: 'column',

  '@hover': {
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '& .title': {
    m: 0,
    mb: '$1',
    fontSize: '$xl',
    ellipsisLine: 1,
  },

  '& .description': {
    m: 0,
    fontSize: '$sm',
    ellipsisLine: 1,
  },
});

const ContentInfo = styled('div', {
  display: 'flex',
  ai: 'center',

  mb: '$1',

  '& .icon': {
    size: '$3',
    color: '$mauve11',
    mr: '$1',
  },

  '& .text': {
    fontSize: '$xs',
    color: '$mauve11',
  },
});

export default TempPostItem;
