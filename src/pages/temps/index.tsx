import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';

import { PageSEO } from '@/components/SEO';
import Layout from '@/components/Layout';
import FloatAction from '@/components/FloatAction';
import TempPostList from '@/components/TempPostList';
import Container from '@/components/Container';

import useGetTempPostsQuery, {
  prefetchGetTempPostsQuery,
} from '@/hooks/query/useGetTempPostsQuery';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetTempPostsQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function TempsPage() {
  const { data, hasNextPage, fetchNextPage } = useGetTempPostsQuery();
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
      <PageSEO url="/temps" title="Temp Posts" description="temp posts" />
      <Layout>
        <Container>
          <TempPostList
            posts={posts}
            hasNextPage={hasNextPage}
            fetchNext={fetchNext}
          />
        </Container>
        <FloatAction />
      </Layout>
    </>
  );
}

export default TempsPage;
