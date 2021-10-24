import { shinyAnimation } from '@/lib/styles/animation';
import { styled } from '@stitches.js';

function PostSkeleton() {
  return (
    <Box>
      <SkeletonBox />
      <BaseBox />
      <BaseBox />
      <BaseBox />
      <BaseBox />
      <BaseBox />
      <BaseBox />
      <BaseBox />
      <BaseBox />
      <BaseBox />
    </Box>
  );
}

const Box = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  animation: `${shinyAnimation} 1s ease-in-out infinite`,
});

const SkeletonBox = styled('div', {
  bc: '$mauve8',
  br: '$3',
});

const BaseBox = styled('div', {
  ml: 'auto',
  height: '$6',
  width: '50%',
  '@sm': {
    height: '$8',
  },

  variants: {
    width: {
      max: {
        width: '100%',
      },
    },
    size: {
      sm: {
        height: '$4',
        '@sm': {
          height: '$6',
        },
      },
      lg: {
        height: '$7',
        '@sm': {
          height: '$9',
        },
      },
    },
  },
});

export default PostSkeleton;
