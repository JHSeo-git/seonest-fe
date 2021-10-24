import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import TempPostList from '@/components/TempPostList';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/SEO/PageSEO';
import useGetTempPostsQuery, {
  prefetchGetTempPostsQuery,
} from '@/hooks/query/useGetTempPostsQuery';
import Container from '@/components/common/Container';
import FloatAction from '@/components/FloatAction';

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
      <PageSEO title="Temp Posts" description="temp posts" />
      <AppLayout>
        <Container>
          <TempPostList
            posts={posts}
            hasNextPage={hasNextPage}
            fetchNext={fetchNext}
          />
        </Container>
        <FloatAction />
      </AppLayout>
    </>
  );
}

export default TempsPage;
