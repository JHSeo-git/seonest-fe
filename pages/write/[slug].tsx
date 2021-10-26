import React, { useMemo } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { dehydrate } from 'react-query/hydration';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/SEO/PageSEO';
import Write from '@/components/Write';
import { useUserValue } from '@/lib/recoil/authState';
import AppError from '@/components/AppError';
import useGetPostBySlugQuery, {
  prefetchGetPostBySlugQuery,
} from '@/hooks/query/useGetPostBySlugQuery';
import getAllPostSlug from '@/lib/api/posts/getAllPostSlug';
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
      <AppLayout layoutType="naked">
        <AppError message="Not Authorized Page" status="401" />
      </AppLayout>
    );
  }

  return (
    <>
      <PageSEO title="Edit post" description="edit post" noRobots={true} />
      <AppLayout layoutType="naked">
        <Write slug={slug} post={post} lastTempPost={lastTempPost} />
      </AppLayout>
    </>
  );
}

export default EditPage;
