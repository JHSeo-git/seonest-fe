import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { styled } from '@stitches.js';
import { dehydrate } from 'react-query/hydration';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/SEO/PageSEO';
import PostList from '@/components/PostList';
import useGetPostsQuery, {
  prefetchGetPostsQuery,
} from '@/hooks/query/useGetPostsQuery';
import Container from '@/components/common/Container';
import FloatAction from '@/components/FloatAction';
import UndrawEmpty from '@/assets/images/undraw-empty.svg';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetPostsQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function PostsPage() {
  const { data, hasNextPage, fetchNextPage } = useGetPostsQuery();
  const posts = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.pages.flat();
  }, [data]);

  const fetchNext = () => {
    fetchNextPage();
  };

  return (
    <>
      <PageSEO title="Posts" description="Seo's honest posts" />
      <AppLayout>
        <Container>
          {posts ? (
            <PostList
              posts={posts}
              hasNextPage={hasNextPage}
              fetchNext={fetchNext}
            />
          ) : (
            <EmptyBox>
              <UndrawEmpty className="empty" />
              <h2>There are no Posts</h2>
            </EmptyBox>
          )}
        </Container>
        {/* <FloatLinkButton iconName="write" to="/write" /> */}
        <FloatAction />
      </AppLayout>
    </>
  );
}

const EmptyBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  jc: 'center',
  ai: 'center',
  '.empty': {
    my: '$4',
    width: '90%',
    height: 'auto',
  },
  h2: {
    fontSize: '$3xl',
    color: '$mauve10',
  },
});

export default PostsPage;
