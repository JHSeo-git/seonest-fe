import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Hydrate } from 'react-query/hydration';
import { QueryClient, QueryClientProvider } from 'react-query';

import { DefaultSEO } from '@/components/SEO';
// import ToastProvider from '@/components/ToastProvider';
import FullscreenLoader from '@/components/FullscreenLoader';
import RecoilInitializer from '@/components/RecoilInitializer';
import DebugObserver from '@/components/DebugObserver';
import Analytics from '@/components/Analytics';
import dynamic from 'next/dynamic';
const ToastProvider = dynamic(() => import('@/components/ToastProvider'));
// const FullscreenLoader = dynamic(() => import('@/components/FullscreenLoader'));

import globalStyle from '@/utils/globalStyles';
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
            <DebugObserver />
          </QueryClientProvider>
        </RecoilRoot>
        <Analytics />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
