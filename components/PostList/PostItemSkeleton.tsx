import React from 'react';
import { styled } from '@stitches.js';
import { shinyAnimation } from '@/lib/styles/animation';

const PostItemSkeleton = React.forwardRef<React.ElementRef<'div'>, {}>(
  ({}, ref) => {
    return (
      <ItemBox ref={ref}>
        <LinkBox>
          <ImageWrapper />
          <ContentWrapper />
        </LinkBox>
      </ItemBox>
    );
  }
);

const ItemBox = styled('div', {
  '&:not(:last-child)': {
    borderBottom: '1px solid $colors$mauve6',
  },
});

const LinkBox = styled('div', {
  height: '14rem',
  display: 'flex',
  gap: '$4',
  py: '$6',

  animation: `${shinyAnimation} 1s ease infinite`,
});

const ImageWrapper = styled('div', {
  position: 'relative',
  display: 'none',
  br: '$2',
  bc: '$mauve3',
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
  br: '$2',
  flexDirection: 'column',
  overflow: 'hidden',

  bc: '$mauve3',
});

export default PostItemSkeleton;
