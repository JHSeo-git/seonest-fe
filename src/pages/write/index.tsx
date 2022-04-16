import React from 'react';

import Write from '@/components/Write';
import AppError from '@/components/AppError';
import Layout from '@/components/Layout';
import { PageSEO } from '@/components/SEO';

import { useUserValue } from '@/helpers/recoil/authState';

function WritePage() {
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
        url="/write"
        title="New post"
        description="new post"
        noRobots={true}
      />
      <Layout layoutType="naked">
        <Write />
      </Layout>
    </>
  );
}

export default WritePage;
