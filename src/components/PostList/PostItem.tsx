import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { styled } from '@stitches.js';
import { useRouter } from 'next/router';
import markdownToText from 'markdown-to-text';

import { Post } from '@/helpers/api/posts/types';
import { getDiffOfNow } from '@/utils/dateUtils';
import { humanizeTime } from '@/utils/viewerUtils';

import { ReactComponent as EyeIcon } from '@/assets/icons/eye.svg';
import { ReactComponent as ClockIcon } from '@/assets/icons/clock.svg';
import { ReactComponent as CalendarIcon } from '@/assets/icons/calendar.svg';
import { ReactComponent as CheckCircleIcon } from '@/assets/icons/check-circle.svg';

const Updated = ({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt: string;
}) => {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);
  const now = new Date();

  const diff = updated.getTime() - created.getTime();
  // 하루 미만일 때는 updated 표시 안하도록
  if (diff < 1000 * 60 * 60 * 24) {
    return null;
  }

  // 현재 날짜에서 1주일이 지났으면 표시안되도록
  const nowDiff = now.getTime() - updated.getTime();
  if (nowDiff > 1000 * 60 * 60 * 24 * 7) {
    return null;
  }
  return (
    <UpdatedBox>
      <CheckCircleIcon />
      <span>{`${updated.toLocaleDateString()}`} updated</span>
    </UpdatedBox>
  );
};

const UpdatedBox = styled('div', {
  ml: 'auto',
  mt: 'auto',
  display: 'flex',
  ai: 'center',

  svg: {
    size: '15px',
    color: '$crimson11',
  },

  span: {
    ml: '$1',
    fontSize: '$xs',
    color: '$crimson11',
  },
});

const ContentInfo = ({
  createdAt,
  updatedAt,
  readTime,
  views,
}: {
  createdAt: string;
  updatedAt: string;
  readTime?: number;
  views?: number;
}) => {
  return (
    <ContentInfoBox>
      <ContentInfoCol>
        <FlexBox>
          <CalendarIcon className="icon" />
          <span className="text">{getDiffOfNow(createdAt)}</span>
        </FlexBox>
        {readTime && (
          <FlexBox>
            <ClockIcon className="icon" />
            <span className="text">{humanizeTime(readTime)}</span>
          </FlexBox>
        )}
        <FlexBox>
          <EyeIcon className="icon" />
          <span className="text">{views ? views : 0}</span>
        </FlexBox>
      </ContentInfoCol>
      <Updated createdAt={createdAt} updatedAt={updatedAt} />
    </ContentInfoBox>
  );
};

const ContentInfoBox = styled('div', {
  display: 'flex',
  ai: 'center',
  mt: 'auto',

  '& .icon': {
    size: '$3',
    color: '$mauve11',
  },

  '& .text': {
    fontSize: '$xs',
    color: '$mauve11',
    ml: '$1',
  },
});

const ContentInfoCol = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
});

const FlexBox = styled('div', {
  display: 'flex',
  ai: 'center',
});

const Seperator = styled('div', {
  height: '$3',
  width: '1px',
  mx: '$4',
  bc: '$mauve7',
});

export type PostItemProps = {
  post: Post;
  loading?: boolean;
  viewThumbnail?: boolean;
};

function getDescription(post: Post) {
  if (post.short_description) {
    return post.short_description;
  }
  if (post.body) {
    return markdownToText(post.body).slice(0, 150);
  }
  return '';
}

function PostItem({ post, loading }: PostItemProps) {
  const router = useRouter();

  const categories = useMemo(() => {
    if (!post.categories) return null;
    return post.categories.sort((a, b) => (a.name > b.name ? 1 : -1));
  }, [post]);

  const onPushRouter = (href: string) => {
    router.push(href);
  };

  return (
    <PostItemBox>
      <Link href={`/posts/${post.url_slug}`} passHref>
        <LinkBox>
          <ImageWrapper>
            {post.thumbnail && (
              <Image
                src={post.thumbnail}
                alt="post thumbnail"
                layout="fill"
                placeholder={'blur'}
                blurDataURL={post.thumbnail}
                objectFit="cover"
              />
            )}
          </ImageWrapper>
          <ContentWrapper>
            <ContentHeader>{post.title}</ContentHeader>
            {categories && categories.length > 0 && (
              <ContentCategories>
                {categories.map((category) => (
                  <li key={category.id}>
                    <CategoryLink
                      onClick={(e) => {
                        e.preventDefault();
                        onPushRouter(`/categories/${category.url_slug}`);
                      }}
                    >
                      {category.name}
                    </CategoryLink>
                  </li>
                ))}
              </ContentCategories>
            )}
            <ContentDescription>{getDescription(post)}</ContentDescription>
            <ContentInfo
              createdAt={post.created_at}
              updatedAt={post.updated_at}
              readTime={post.read_time}
              views={post.read_count}
            />
          </ContentWrapper>
        </LinkBox>
      </Link>
    </PostItemBox>
  );
}

const PostItemBox = styled('li', {
  '&:not(:last-child)': {
    borderBottom: '1px solid $colors$mauve6',
  },
});

const LinkBox = styled('a', {
  height: '15rem',
  display: 'flex',
  gap: '$4',
  py: '$6',
});

const ImageWrapper = styled('div', {
  position: 'relative',
  display: 'none',
  br: '$2',
  bc: '$cyan3',
  overflow: 'hidden',
  '@sm': {
    display: 'block',
    width: '220px',
  },
});

const ContentWrapper = styled('div', {
  flex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const ContentHeader = styled('h3', {
  m: 0,
  fontSize: '$2xl',
  color: '$mauve12',
  mb: '$1',
  ellipsisLine: 1,
});

const ContentCategories = styled('ul', {
  p: 0,
  display: 'flex',
  ai: 'center',
  flexWrap: 'wrap',
  gap: '$1',
  mb: '$2',

  '& li': {
    display: 'block',
  },
});

const CategoryLink = styled('button', {
  display: 'flex',
  jc: 'center',
  ai: 'center',
  py: '$1',
  px: '$2',
  bc: '$blue4',
  color: '$blue11',
  br: '$2',
  fontSize: '$xs',
  fontWeight: 'bold',

  '@hover': {
    '&:hover': {
      bc: '$blue5',
    },
  },
});

const ContentDescription = styled('p', {
  m: 0,
  fontSize: '$base',
  color: '$mauve11',
  ellipsisLine: 2,
});

export default PostItem;
