import { GetServerSideProps, GetStaticProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import appConfig from '@/config/app.config';
import getCategories from '@/lib/api/categories/getCategories';
import getAllPosts from '@/lib/api/posts/getAllPosts';

// exclude
export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return { notFound: true };
  }

  return { props: {} };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const posts = await getAllPosts();
//   const categories = await getCategories();

//   const fields: ISitemapField[] = [
//     {
//       loc: `${appConfig.url}/about`,
//     },
//     {
//       loc: `${appConfig.url}/categories`,
//     },
//     ...posts.map<ISitemapField>((post) => ({
//       loc: `${appConfig.url}/posts/${post.url_slug}`,
//       changefreq: 'daily',
//       priority: 0.7,
//       lastmod: post.updated_at,
//     })),
//     ...categories.map<ISitemapField>((category) => ({
//       loc: `${appConfig.url}/categories/${category.url_slug}`,
//       changefreq: 'daily',
//       priority: 0.3,
//       lastmod: category.updated_at,
//     })),
//   ];

//   return getServerSideSitemap(ctx, fields);
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {};
