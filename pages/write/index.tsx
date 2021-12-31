import React from 'react';

// import Write from '@/components/Write';
// import AppError from '@/components/AppError';
// import AppLayout from '@/components/AppLayout';
// import PageSEO from '@/components/SEO/PageSEO';
import dynamic from 'next/dynamic';
const Write = dynamic(() => import('@/components/Write'));
const AppError = dynamic(() => import('@/components/AppError'));
const AppLayout = dynamic(() => import('@/components/AppLayout'));
const PageSEO = dynamic(() => import('@/components/SEO/PageSEO'));

import { useUserValue } from '@/lib/recoil/authState';

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
