import React from 'react';
import { styled } from '@stitches.js';
import { Giscus } from '@giscus/react';

import PostBody from './PostBody';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostProgressbar from './PostProgressbar';

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
      <GiscusBox>
        <Giscus
          repo="jhseo-git/seonest-comments"
          repoId="R_kgDOGRegJA"
          category="Announcements"
          categoryId="DIC_kwDOGRegJM4CN-hf"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="ko"
        />
      </GiscusBox>
    </>
  );
}

const GiscusBox = styled('div', {
  mt: '4rem',
});

export default PostContainer;
