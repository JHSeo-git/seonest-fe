import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import appConfig from '@/config/app.config';
import getPosts from '@/lib/api/posts/getPosts';
import getCategories from '@/lib/api/categories/getCategories';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await getPosts();
  const categories = await getCategories();

  const fields: ISitemapField[] = [
    {
      loc: `${appConfig.url}/about/`,
    },
    {
      loc: `${appConfig.url}/categories/`,
    },
    ...posts.map<ISitemapField>((post) => ({
      loc: `${appConfig.url}/posts/${encodeURI(post.url_slug)}/`,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: post.updated_at,
    })),
    ...categories.map<ISitemapField>((category) => ({
      loc: `${appConfig.url}/categories/${encodeURI(category.url_slug)}/`,
      changefreq: 'daily',
      priority: 0.3,
      lastmod: category.updated_at,
    })),
  ];

  return getServerSideSitemap(ctx, fields);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {};
