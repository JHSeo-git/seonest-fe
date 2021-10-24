import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import { darkThemeClassName, lightThemeClassName } from '@stitches.js';
import RecoilInitializer from '@/components/RecoilInitializer';
import FullscreenLoader from '@/components/FullscreenLoader';
import { DefaultSEO } from '@/components/SEO/DefaultSEO';
import ToastProvider from '@/components/ToastProvider';
import globalStyle from '@/lib/styles/globalStyle';
import DebugComponents from '@/components/debug/DebugComponents';
import FirebaseAnalytics from '@/components/analytics/FirebaseAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  globalStyle();

  // set retry 3 time, retryDelay 3 sec
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retryDelay: 3000,
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
