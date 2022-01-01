import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';

import PageSEO from '@/components/SEO/PageSEO';
import AppLayout from '@/components/AppLayout';
import FloatAction from '@/components/FloatAction';
import TempPostList from '@/components/TempPostList';
import Container from '@/components/common/Container';

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
