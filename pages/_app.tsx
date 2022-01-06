import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Hydrate } from 'react-query/hydration';
import { QueryClient, QueryClientProvider } from 'react-query';

import DefaultSEO from '@/components/SEO/DefaultSEO';
// import ToastProvider from '@/components/ToastProvider';
import FullscreenLoader from '@/components/FullscreenLoader';
import RecoilInitializer from '@/components/RecoilInitializer';
import DebugComponents from '@/components/debug/DebugComponents';
import FirebaseAnalytics from '@/components/analytics/FirebaseAnalytics';
import dynamic from 'next/dynamic';
const ToastProvider = dynamic(() => import('@/components/ToastProvider'));
// const FullscreenLoader = dynamic(() => import('@/components/FullscreenLoader'));

import globalStyle from '@/lib/styles/globalStyle';
import { darkThemeClassName, lightThemeClassName } from '@stitches.js';

function MyApp({ Component, pageProps }: AppProps) {
  globalStyle();

  // set retry only 1,
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
        />

        {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        /> */}
      </Head>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: lightThemeClassName, dark: darkThemeClassName }}
        defaultTheme="system"
        enableSystem={true}
      >
        <DefaultSEO />
        <RecoilRoot>
          <RecoilInitializer />
          <ToastProvider />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <FullscreenLoader />
            </Hydrate>
            <DebugComponents />
          </QueryClientProvider>
        </RecoilRoot>
        <FirebaseAnalytics />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
