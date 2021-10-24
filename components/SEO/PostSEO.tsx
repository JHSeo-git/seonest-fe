import React from 'react';
import { BlogJsonLd, NextSeo } from 'next-seo';
import appConfig from '@/config/app.config';
import { useRouter } from 'next/router';

export type PostSEOProps = {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  images: string[];
  noRobots?: boolean;
};

const PostSEO = ({
  title,
  description,
  publishedTime,
  modifiedTime,
  images,
  noRobots = false,
}: PostSEOProps) => {
  const router = useRouter();
  const url = `${appConfig.url}${router.asPath}`;
  const ogImages = images.map((image) => ({
    url: image,
    alt: `${title} thumbnail`,
  }));
  return (
    <>
      <NextSeo
        title={`${title} – ${appConfig.title}`}
        description={description}
        canonical={url}
        openGraph={{
          type: 'article',
          url,
          title: `${title} – ${appConfig.title}`,
          description,
          article: {
            publishedTime,
            modifiedTime,
            authors: [appConfig.github],
          },
          images: ogImages,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
        noindex={noRobots}
        nofollow={noRobots}
      />
      <BlogJsonLd
        authorName={appConfig.author}
        dateModified={modifiedTime}
        datePublished={publishedTime}
        description={description}
        images={images}
        title={title}
        url={url}
      />
    </>
  );
};

export default PostSEO;
