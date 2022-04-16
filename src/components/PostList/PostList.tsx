import { useEffect, useRef } from 'react';
import { styled } from '@stitches.js';
import useInView from '@/hooks/useInView';
import { Post } from '@/helpers/api/posts/types';
import PostItem from './PostItem';
import PostItemSkeleton from './PostItemSkeleton';

export type PostListProps = {
  posts: Post[];
  hasNextPage?: boolean;
  fetchNext?: () => void;
};

function PostList({ posts, hasNextPage, fetchNext }: PostListProps) {
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
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
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

export default PostList;
