import { DefaultSeo } from 'next-seo';
import appConfig from '@/config/app.config';

export const DefaultSEO = () => {
  return (
    <DefaultSeo
      title={appConfig.title}
      description={appConfig.description}
      openGraph={{
        type: 'website',
        locale: 'ko-KR',
        url: appConfig.url,
        title: appConfig.title,
        description: appConfig.description,
        images: [{ alt: appConfig.title, url: appConfig.siteLogo }],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  );
};
