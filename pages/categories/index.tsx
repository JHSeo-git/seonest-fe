import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { dehydrate } from 'react-query';
import { styled } from '@stitches.js';
import AppError from '@/components/AppError';
import AppLayout from '@/components/AppLayout';
import Container from '@/components/common/Container';
import PageSEO from '@/components/SEO/PageSEO';
import useGetCategoriesQuery, {
  prefetchGetCategoriesQuery,
} from '@/hooks/query/useGetCategoriesQuery';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetCategoriesQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function CategoriesPage() {
  const { data } = useGetCategoriesQuery();
  const categories = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  if (!categories)
    return (
      <AppLayout layoutType="naked">
        <AppError message="Not Found Page" status="404" />
      </AppLayout>
    );

  return (
    <>
      <PageSEO title="Categories" description="Seo's honest post categories" />
      <AppLayout>
        <Container
          css={{
            px: '$4',
          }}
        >
          <Title>Category</Title>
          {categories ? (
            <Box>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.url_slug}`}
                  passHref
                >
                  <CategoryLink>{category.name}</CategoryLink>
                </Link>
              ))}
            </Box>
          ) : (
            <div>empty</div>
          )}
        </Container>
      </AppLayout>
    </>
  );
}

// TODO: styles
const Title = styled('h1', {
  fontSize: '$4xl',
  fontWeight: 'bold',
  color: '$mauve12',
  m: 0,
  mb: '$4',
  pb: '$4',
  borderBottom: '1px solid $colors$mauve7',
});

const Box = styled('div', {
  display: 'grid',
  gap: '$2',
  gridTemplateColumns: 'repeat(2, 1fr)',
});

const CategoryLink = styled('a', {
  height: '$8',
  display: 'flex',
  jc: 'center',
  ai: 'center',
  br: '$2',
  bc: '$blue4',
  color: '$blue10',
  fontSize: '$xl',
  fontWeight: 'bold',
  transition: 'box-shadow 0.2s ease',

  '@hover': {
    '&:hover': {
      boxShadow: '$interactiveShadow1',
    },
  },
});

export default CategoriesPage;
