import { useMemo } from 'react';
import { styled } from '@stitches.js';
import { dehydrate } from 'react-query';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import AppError from '@/components/AppError';
import PostList from '@/components/PostList';
import { PageSEO } from '@/components/SEO';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import EmptyPanel from '@/components/EmptyPanel';

import { Post } from '@/helpers/api/posts/types';
import { Category } from '@/helpers/api/categories/types';
import getCategories from '@/helpers/api/categories/getCategories';
import useGetRawCategoriesBySlugQuery, {
  prefetchGetRawCategoriesBySlugQuery,
} from '@/hooks/query/useGetRawCategoriesBySlugQuery';

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

  // const queryClient = await prefetchGetCategoryBySlugQuery(params.slug);
  const queryClient = await prefetchGetRawCategoriesBySlugQuery(params.slug);

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
    params: {
      slug: category.url_slug,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

type CategoryPageProps = {
  slug: string;
};

function CategoryPage({ slug }: CategoryPageProps) {
  const { data, hasNextPage, fetchNextPage } =
    useGetRawCategoriesBySlugQuery(slug);
  const category = useMemo(() => {
    if (!data) return null;

    const rawCategories = data.pages.flat();

    const posts = rawCategories.reduce<Post[]>((acc, curr) => {
      const serializedPost: Post = {
        id: curr.post_id,
        title: curr.post_title,
        body: curr.post_body,
        short_description: curr.post_short_description,
        thumbnail: curr.post_thumbnail,
        url_slug: curr.post_url_slug,
        is_temp: curr.post_is_temp,
        created_at: curr.post_created_at,
        updated_at: curr.post_updated_at,
        read_time: curr.post_read_time,
        read_count: curr.post_read_count,
        user: {
          id: curr.user_id,
          display_name: curr.user_display_name,
          email: curr.user_email,
          photo_url: curr.user_photo_url,
          created_at: curr.user_created_at,
          updated_at: curr.user_updated_at,
        },
      };
      return [...acc, serializedPost];
    }, [] as Post[]);

    const serializedCategory: Category = {
      id: rawCategories[0].category_id,
      name: rawCategories[0].category_name,
      url_slug: rawCategories[0].category_url_slug,
      created_at: rawCategories[0].category_created_at,
      updated_at: rawCategories[0].category_updated_at,
      posts,
    };

    return serializedCategory;
  }, [data]);

  const fetchNext = () => {
    fetchNextPage();
  };

  if (!category)
    return (
      <Layout layoutType="naked">
        <AppError message="Not Found Page" status="404" />
      </Layout>
    );

  return (
    <>
      <PageSEO
        url={`/categories/${category.url_slug}`}
        title={`${category.name} category`}
        description={`${category.name} category`}
      />
      <Layout>
        <Container>
          <Title>{category.name}</Title>
          {category.posts ? (
            <PostList
              posts={category.posts}
              hasNextPage={hasNextPage}
              fetchNext={fetchNext}
            />
          ) : (
            <EmptyPanel />
          )}
        </Container>
      </Layout>
    </>
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
