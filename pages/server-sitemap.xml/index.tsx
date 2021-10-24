import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import appConfig from '@/config/app.config';
import getAllPostSlug from '@/lib/api/posts/getAllPostSlug';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postSlugs = await getAllPostSlug();

  const fields: ISitemapField[] = postSlugs.map((slug) => ({
    loc: `${appConfig.url}/posts/${slug}/`,
    changefreq: 'daily',
    priority: 0.7,
  }));

  fields.push({
    loc: `${appConfig.url}/about/`,
  });

  return getServerSideSitemap(ctx, fields);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {};
