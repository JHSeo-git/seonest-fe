import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@stitches.js';
import { Post } from '@/lib/api/posts/types';
import { getDiffOfNow } from '@/lib/utils/dateUtils';
import { humanizeTime } from '@/lib/utils/viewerUtils';
import CalendarIcon from '@/assets/icons/calendar.svg';
import CheckCircleIcon from '@/assets/icons/check-circle.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import EyeIcon from '@/assets/icons/eye.svg';

const Updated = ({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt: string;
}) => {
  const created = new Date(createdAt);
  const updated = new Date(updatedAt);

  const diff = updated.getTime() - created.getTime();
  // 하루 미만일 때는 updated 표시 안하도록
  if (diff < 1000 * 60 * 60 * 24) {
    return null;
  }
  return (
    <UpdatedBox>
      <CheckCircleIcon />
      <span>updated</span>
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
          <span className="text">{getDiffOfNow(updatedAt)}</span>
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

function PostItem({ post, loading }: PostItemProps) {
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
            <ContentDescription>{post.short_description}</ContentDescription>
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
  height: '14rem',
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
  mb: '$2',
  ellipsisLine: 1,
});

const ContentDescription = styled('p', {
  m: 0,
  fontSize: '$base',
  color: '$mauve11',
  ellipsisLine: 2,
});

export default PostItem;
