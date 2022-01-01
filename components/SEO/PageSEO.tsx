import { NextSeo } from 'next-seo';
import appConfig from '@/config/app.config';

export type PageSEOProps = {
  url: string;
  title: string;
  description: string;
  noRobots?: boolean;
};

const PageSEO = ({
  url,
  title,
  description,
  noRobots = false,
}: PageSEOProps) => {
  const fullUrl = `${appConfig.url}${url.startsWith('/') ? url : `/${url}`}`;
  return (
    <NextSeo
      title={`${title} – ${appConfig.title}`}
      description={description}
      canonical={fullUrl}
      openGraph={{
        type: 'website',
        title: `${title} – ${appConfig.title}`,
        description,
        url: fullUrl,
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
