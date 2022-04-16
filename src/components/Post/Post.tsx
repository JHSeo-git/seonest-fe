import React from 'react';

import PostBody from './PostBody';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostProgressbar from './PostProgressbar';
import dynamic from 'next/dynamic';
const GiscusComment = dynamic(() => import('../GiscusComment'), { ssr: false });

import { Post } from '@/lib/api/posts/types';
// const UtterancsComment = dynamic(() => import('../UtterancsComment'), {
//   ssr: false,
// });

export type PostProps = {
  post: Post;
};

function PostContainer({ post }: PostProps) {
  return (
    <>
      <PostProgressbar />
      <PostHeader post={post} />
      <PostBody markdown={post.body} />
      <PostFooter
        isTemp={post.is_temp}
        nextPost={post.next_post}
        prevPost={post.prev_post}
      />
      {/* <UtterancsComment /> */}
      <GiscusComment />
    </>
  );
}

export default PostContainer;
