import React from 'react';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/SEO/PageSEO';
import Write from '@/components/Write';
import { useUserValue } from '@/lib/recoil/authState';
import AppError from '@/components/AppError';

function WritePage() {
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
      <PageSEO title="New post" description="new post" noRobots={true} />
      <AppLayout layoutType="naked">
        <Write />
      </AppLayout>
    </>
  );
}

export default WritePage;
