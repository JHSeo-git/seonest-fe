import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/SEO/PageSEO';
import Write from '@/components/Write';
import useLoadPost from '@/hooks/useLoadPost';
import { useUserValue } from '@/lib/recoil/authState';
import AppError from '@/components/AppError';

function LoadedEditPage({ slug }: { slug: string }) {
  const { loaded } = useLoadPost(slug);
  const title = `${slug.length > 10 ? `${slug.slice(0, 10)}...` : slug}`;

  if (!loaded) return null;

  return (
    <>
      <PageSEO title={title} description="new post" noRobots={true} />
      <AppLayout layoutType="naked">
        <Write slug={slug} />
      </AppLayout>
    </>
  );
}

function EditPage() {
  const user = useUserValue();
  const router = useRouter();
  const { slug } = router.query;

  const guardSlug = useMemo(() => {
    if (!slug) return null;
    if (typeof slug !== 'string') return null;
    return slug;
  }, [slug]);

  if (!user) {
    return (
      <AppLayout layoutType="naked">
        <AppError message="Not Authorized Page" status="401" />
      </AppLayout>
    );
  }

  if (!guardSlug) return null;

  return <LoadedEditPage slug={guardSlug} />;
}

export default EditPage;
