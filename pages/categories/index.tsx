import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { dehydrate } from 'react-query';
import { styled } from '@stitches.js';
import AppLayout from '@/components/AppLayout';
import Container from '@/components/common/Container';
import PageSEO from '@/components/SEO/PageSEO';
import useGetCategoriesQuery, {
  prefetchGetCategoriesQuery,
} from '@/hooks/query/useGetCategoriesQuery';
import EmptyPanel from '@/components/common/EmptyPanel';

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
    return data.sort((a, b) =>
      (a.postsCount ?? 0) - (b.postsCount ?? 0) > 0 ? -1 : 1
    );
  }, [data]);

  return (
    <>
      <PageSEO title="Categories" description="Seo's honest post categories" />
      <AppLayout>
        <Container
          css={{
            px: '$4',
          }}
        >
          <Title>Categories</Title>
          {categories ? (
            <Box>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.url_slug}`}
                  passHref
                >
                  <CategoryLink>
                    {category.name}
                    <Seperator />
                    <Count>{category.postsCount ?? 0}</Count>
                  </CategoryLink>
                </Link>
              ))}
            </Box>
          ) : (
            <EmptyPanel />
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
  color: '$mauve11',
  m: 0,
  mb: '$4',
  pb: '$4',
  borderBottom: '1px solid $colors$mauve7',
});

const Box = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$4',

  '@xs': {
    gap: '$2',
  },
});

const CategoryLink = styled('a', {
  display: 'flex',
  jc: 'center',
  ai: 'center',

  br: '$2',
  px: '$4',
  py: '$2',

  color: '$blue10',
  fontSize: '$xl',
  fontWeight: 'bold',

  border: '1px solid $blue7',
  transition: 'box-shadow 0.2s ease',

  '@hover': {
    '&:hover': {
      boxShadow: '$interactiveShadow1',
    },
  },
});

const Count = styled('span', {
  fontSize: '$base',
  color: '$mauve12',
});

const Seperator = styled('div', {
  height: '1rem',
  width: '1px',
  bc: '$blue10',

  mx: '$2',
});

export default CategoriesPage;
