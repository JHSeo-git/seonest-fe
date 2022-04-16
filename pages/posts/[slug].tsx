import React, { useMemo } from 'react';
import markdownToText from 'markdown-to-text';
import { dehydrate } from 'react-query/hydration';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import Post from '@/components/Post';
import AppError from '@/components/AppError';
import { PostSEO } from '@/components/SEO';
import Layout from '@/components/Layout';
import FloatAction from '@/components/FloatAction';
import Container from '@/components/Container';

import getAllPostSlug from '@/lib/api/posts/getAllPostSlug';
import useGetPostBySlugQuery, {
  prefetchGetPostBySlugQuery,
} from '@/hooks/query/useGetPostBySlugQuery';

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

  const queryClient = await prefetchGetPostBySlugQuery(params.slug);

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await getAllPostSlug();
  const paths = postSlugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: true,
  };
};

type PostPageProps = {
  slug: string;
};

function PostPage({ slug }: PostPageProps) {
  const { data } = useGetPostBySlugQuery(slug);
  const post = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  if (!post)
    return (
      <Layout layoutType="naked">
        <AppError message="Not Found Page" status="404" />
      </Layout>
    );

  return (
    <>
      <PostSEO
        url={`/posts/${slug}`}
        title={post.title}
        description={
          post.short_description ??
          markdownToText(post.body).trim().slice(0, 150)
        }
        images={post.thumbnail ? [post.thumbnail] : []}
        modifiedTime={post.updated_at}
        publishedTime={post.created_at}
      />
      <Layout>
        <Container>
          <Post post={post} />
        </Container>
        <FloatAction editSlug={post.url_slug} />
      </Layout>
    </>
  );
}

export default PostPage;
