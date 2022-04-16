import React, { useMemo } from 'react';
import { dehydrate } from 'react-query/hydration';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import Write from '@/components/Write';
import AppError from '@/components/AppError';
import Layout from '@/components/Layout';
import { PageSEO } from '@/components/SEO';

import { useUserValue } from '@/helpers/recoil/authState';
import useGetPostBySlugQuery, {
  prefetchGetPostBySlugQuery,
} from '@/hooks/query/useGetPostBySlugQuery';
import getAllPostSlug from '@/helpers/api/posts/getAllPostSlug';
import useGetLastTempPostBySlugQuery, {
  prefetchGetLastTempPostBySlugQuery,
} from '@/hooks/query/useGetLastTempPostBySlugQuery';

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await getAllPostSlug(true);
  const paths = postSlugs.map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: true,
  };
};

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
  await prefetchGetLastTempPostBySlugQuery(params.slug, queryClient);

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      slug: params.slug,
    },
  };
};

type EditPageProps = {
  slug: string;
};

function EditPage({ slug }: EditPageProps) {
  const { data: postData } = useGetPostBySlugQuery(slug);
  const { data: lastTempData } = useGetLastTempPostBySlugQuery(slug);

  const post = useMemo(() => {
    if (!postData) return null;
    return postData;
  }, [postData]);

  const lastTempPost = useMemo(() => {
    if (!lastTempData) return null;
    return lastTempData;
  }, [lastTempData]);

  const user = useUserValue();

  if (!user) {
    return (
      <Layout layoutType="naked">
        <AppError message="Not Authorized Page" status="401" />
      </Layout>
    );
  }

  return (
    <>
      <PageSEO
        url={`/write/${slug}`}
        title="Edit post"
        description="edit post"
        noRobots={true}
      />
      <Layout layoutType="naked">
        <Write slug={slug} post={post} lastTempPost={lastTempPost} />
      </Layout>
    </>
  );
}

export default EditPage;
