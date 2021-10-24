import { NextSeo } from 'next-seo';
import appConfig from '@/config/app.config';
import { useRouter } from 'next/router';

export type PageSEOProps = {
  title: string;
  description: string;
  url?: string;
  noRobots?: boolean;
};

const PageSEO = ({
  title,
  description,
  url,
  noRobots = false,
}: PageSEOProps) => {
  const router = useRouter();
  return (
    <NextSeo
      title={`${title} – ${appConfig.title}`}
      description={description}
      canonical={url ?? `${appConfig.url}${router.pathname}`}
      openGraph={{
        type: 'website',
        title: `${title} – ${appConfig.title}`,
        description,
        url: url ?? `${appConfig.url}${router.pathname}`,
        images: [{ alt: title, url: appConfig.siteLogo }],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
      noindex={noRobots}
      nofollow={noRobots}
    />
  );
};

export default PageSEO;
