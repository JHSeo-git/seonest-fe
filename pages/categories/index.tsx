import AppLayout from '@/components/AppLayout';
import Container from '@/components/common/Container';
import useGetCategoriesQuery, {
  prefetchGetCategoriesQuery,
} from '@/hooks/query/useGetCategoriesQuery';
import { styled } from '@stitches.js';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useMemo } from 'react';
import { dehydrate } from 'react-query';

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
    if (!data) return [];
    return data;
  }, [data]);
  return (
    <AppLayout>
      <Container
        css={{
          px: '$4',
        }}
      >
        {categories ? (
          <Box>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.url_slug}`}
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
  );
}

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
