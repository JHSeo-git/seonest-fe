import { Giscus } from '@giscus/react';
import { styled } from '@stitches.js';
import { useTheme } from 'next-themes';

export type GiscusCommentProps = {};

function GiscusComment(props: GiscusCommentProps) {
  const { theme } = useTheme();
  return (
    <GiscusBox>
      <Giscus
        repo="JHSeo-git/seonest-comments"
        repoId="R_kgDOGRegJA"
        category="Announcements"
        categoryId="DIC_kwDOGRegJM4CN-hf"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'light' ? 'light' : 'dark'}
        lang="ko"
      />
    </GiscusBox>
  );
}

const GiscusBox = styled('div', {
  mt: '4rem',
});

export default GiscusComment;
