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
import globalStyle from '@/lib/styles/globalStyle';
import DebugComponents from '@/components/debug/DebugComponents';
import FirebaseAnalytics from '@/components/analytics/FirebaseAnalytics';
import dynamic from 'next/dynamic';

// import ToastProvider from '@/components/ToastProvider';
const ToastProvider = dynamic(() => import('@/components/ToastProvider'));

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
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
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
