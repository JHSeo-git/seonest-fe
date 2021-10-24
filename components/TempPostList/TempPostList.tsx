import React, { useEffect, useRef } from 'react';
import TempPostItem from './TempPostItem';
import PostItemSkeleton from '../PostList/PostItemSkeleton';
import { Post } from '@/lib/api/posts/types';
import useInView from '@/hooks/useInView';
import { styled } from '@stitches.js';

export type TempPostListProps = {
  posts: Post[] | null;
  hasNextPage?: boolean;
  fetchNext?: () => void;
};

function TempPostList({ posts, hasNextPage, fetchNext }: TempPostListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { inView } = useInView(ref);

  useEffect(() => {
    if (!inView) return;
    if (!fetchNext) return;
    if (!hasNextPage) return;

    fetchNext();
  }, [inView, fetchNext, hasNextPage]);

  return (
    <ListBox>
      {posts
        ? posts.map((item) => <TempPostItem key={item.id} post={item} />)
        : Array.from({ length: 10 }).map((_, i) => (
            <PostItemSkeleton key={i} />
          ))}
      {hasNextPage && <PostItemSkeleton ref={ref} />}
    </ListBox>
  );
}

const ListBox = styled('ul', {
  m: 0,
  p: 0,
  px: '$2',
  listStyle: 'none',
});

export default TempPostList;
