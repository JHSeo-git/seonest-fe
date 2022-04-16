import { GetStaticProps } from 'next';
import React, { useMemo } from 'react';
import { dehydrate } from 'react-query/hydration';

import PostList from '@/components/PostList';
import Layout from '@/components/Layout';
import { PageSEO } from '@/components/SEO';
import Container from '@/components/Container';
import FloatAction from '@/components/FloatAction';
import EmptyPanel from '@/components/EmptyPanel';

import useGetPostsQuery, {
  prefetchGetPostsQuery,
} from '@/hooks/query/useGetPostsQuery';

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
      <PageSEO url="/posts" title="Posts" description="Seo's honest posts" />
      <Layout>
        <Container>
          {posts ? (
            <PostList
              posts={posts}
              hasNextPage={hasNextPage}
              fetchNext={fetchNext}
            />
          ) : (
            <EmptyPanel />
          )}
        </Container>
        {/* <FloatLinkButton iconName="write" to="/write" /> */}
        <FloatAction />
      </Layout>
    </>
  );
}

export default PostsPage;
