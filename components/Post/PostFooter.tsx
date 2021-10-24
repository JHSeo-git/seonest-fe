import Link from 'next/link';
import { styled } from '@stitches.js';
import { PostShortInfo } from '@/lib/api/posts/types';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';

export type PostFooterProps = {
  isTemp: boolean;
  nextPost?: PostShortInfo;
  prevPost?: PostShortInfo;
};

function PostFooter({ isTemp, prevPost, nextPost }: PostFooterProps) {
  if (isTemp) return null;

  return (
    <Box>
      {prevPost && (
        <Link href={`/posts/${prevPost.url_slug}`} passHref>
          <LinkBox>
            <ChevronRightIcon className="icon reverse" />
            <TitleInfo>
              <div className="label">Prev Post</div>
              <p className="title">{prevPost.title}</p>
            </TitleInfo>
          </LinkBox>
        </Link>
      )}
      {nextPost && (
        <Link href={`/posts/${nextPost.url_slug}`} passHref>
          <LinkBox direction="right">
            <TitleInfo>
              <div className="label">Next Post</div>
              <p className="title">{nextPost.title}</p>
            </TitleInfo>
            <ChevronRightIcon className="icon" />
          </LinkBox>
        </Link>
      )}
    </Box>
  );
}

const Box = styled('div', {
  mt: '$8',
  display: 'block',

  '@sm': {
    display: 'flex',
    jc: 'space-between',
    ai: 'center',

    gap: '$6',
  },
});

const LinkBox = styled('a', {
  textDecoration: 'none',
  border: '1px solid $colors$blue6',
  br: '$2',
  width: '100%',
  height: '$9',
  display: 'flex',
  ai: 'center',
  gap: '$2',
  transition: 'all 100ms ease',
  px: '$3',
  mb: '$6',

  '& .icon': {
    color: '$blue9',
    size: '25px',
  },

  '& .reverse': {
    transform: 'rotateY(180deg)',
  },

  '@hover': {
    '&:hover': {
      bs: '$interactiveShadow1',
    },
  },

  '@sm': {
    mb: 0,
  },

  variants: {
    direction: {
      right: {
        jc: 'flex-end',
        textAlign: 'right',
      },
    },
  },
});

const TitleInfo = styled('div', {
  '& .label': {
    m: 0,
    fontSize: '$xs',
    color: '$mauve11',
    mb: '$1',
  },
  '& .title': {
    m: 0,
    fontSize: '$xl',
    fontWeight: 'bold',
    ellipsisLine: 1,
  },
});

export default PostFooter;
