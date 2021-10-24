import React from 'react';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useUserValue } from '@/lib/recoil/authState';
import PageSEO from '@/components/SEO/PageSEO';
import AppLayout from '@/components/AppLayout';
import { styled } from '@stitches.js';
import { useRouter } from 'next/router';
import Button from '@/components/common/Button';

function Admin() {
  const userState = useUserValue();
  const { back } = useRouter();

  if (userState)
    return (
      <AppLayout>
        <Box
          css={{
            flexDirection: 'column',
            gap: '$2',
          }}
        >
          <h2>Already Logged In</h2>
          <Button onClick={() => back()}>Go Back</Button>
        </Box>
      </AppLayout>
    );

  return (
    <>
      <PageSEO title="Admin" description="admin page" noRobots={true} />
      <AppLayout>
        <Box>
          <GoogleLoginButton />
        </Box>
      </AppLayout>
    </>
  );
}

const Box = styled('div', {
  position: 'absolute',
  inset: 0,

  display: 'flex',
  jc: 'center',
  ai: 'center',
});

export default Admin;
