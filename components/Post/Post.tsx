import React from 'react';
import dynamic from 'next/dynamic';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import { Post } from '@/lib/api/posts/types';
import PostProgressbar from './PostProgressbar';

const UtterancsComment = dynamic(() => import('../UtterancsComment'), {
  ssr: false,
});

export type PostProps = {
  post: Post;
};

function PostContainer({ post }: PostProps) {
  return (
    <>
      {/* <PostProgressbar /> */}
      <PostHeader post={post} />
      <PostBody markdown={post.body} />
      <PostFooter
        isTemp={post.is_temp}
        nextPost={post.next_post}
        prevPost={post.prev_post}
      />
      <UtterancsComment />
    </>
  );
}

export default PostContainer;
