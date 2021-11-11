import AppLayout from '@/components/AppLayout';
import Container from '@/components/common/Container';
import CubeIcon from '@/assets/icons/cube.svg';
import { styled } from '@stitches.js';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { dehydrate } from 'react-query';
import getCategories from '@/lib/api/categories/getCategories';
import useGetCategoryBySlugQuery, {
  prefetchGetCategoryBySlugQuery,
} from '@/hooks/query/useGetCategoryBySlugQuery';
import { useMemo } from 'react';
import PostList from '@/components/PostList';
import EmptyPanel from '@/components/common/EmptyPanel';

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  if (typeof params.slug !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  const queryClient = await prefetchGetCategoryBySlugQuery(params.slug);

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    params: { slug: category.url_slug },
  }));
  return {
    paths,
    fallback: true,
  };
};

type CategoryPageProps = {
  slug: string;
};

// TODO: posts paging
function CategoryPage({ slug }: CategoryPageProps) {
  const { data, error } = useGetCategoryBySlugQuery(slug);
  const category = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  return (
    <AppLayout>
      <Container>
        <Title>{category?.name}</Title>
        {category?.posts ? <PostList posts={category.posts} /> : <EmptyPanel />}
      </Container>
    </AppLayout>
  );
}

const Title = styled('h1', {
  textAlign: 'center',
  fontSize: '$3xl',
  color: '$blue10',
  pb: '$4',
  borderBottom: '1px solid $blue5',
});

export default CategoryPage;
