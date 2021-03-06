import Link from 'next/link';
import { styled } from '@stitches.js';
import { GetStaticProps } from 'next';
import React, { useMemo } from 'react';
import { dehydrate } from 'react-query/hydration';

import PostList from '@/components/PostList';
import { PageSEO } from '@/components/SEO';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Container from '@/components/Container';

import { ReactComponent as ChevronRightIconSvg } from '@/assets/icons/chevron-right.svg';
import useGetPostsByLatestQuery, {
  prefetchGetPostsByLatestQuery,
} from '@/hooks/query/useGetPostsByLatestQuery';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetPostsByLatestQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function HomePage() {
  const { data, error } = useGetPostsByLatestQuery();

  const posts = useMemo(() => {
    if (!data) return null;
    return data;
  }, [data]);

  return (
    <>
      <PageSEO url="/" title="Seonest" description="Seo's honest nest" />
      <Layout>
        <Hero>
          <h1>Slow but Steady</h1>
        </Hero>
        <Container>
          {posts && <PostList posts={posts} />}
          <LinkWrapper>
            <Link href="/posts" passHref>
              <Button
                as="a"
                kind="blueScale"
                css={{
                  width: '100%',
                  px: '$2',
                  py: '$2',
                  display: 'flex',
                  ai: 'center',

                  '@sm': {
                    width: 'auto',
                    py: '$1',
                  },
                }}
              >
                <span>More</span>
                <ChevronRightIcon />
              </Button>
            </Link>
          </LinkWrapper>
        </Container>
      </Layout>
    </>
  );
}

const Hero = styled('section', {
  width: '100%',
  height: '400px',

  // TODO: hero image
  backgroundImage: 'linear-gradient(45deg, $colors$lime8, $colors$sky8)',
  display: 'flex',
  jc: 'center',
  ai: 'center',

  h1: {
    m: 0,
    fontSize: '$5xl',
    color: 'transparent',
    backgroundClip: 'text',
    backgroundImage:
      'linear-gradient(90deg, $colors$mauve12, $colors$crimson11)',
  },
});

const LinkWrapper = styled('div', {
  display: 'flex',
  jc: 'flex-end',
  px: '$2',
  my: '$4',
});

const ChevronRightIcon = styled(ChevronRightIconSvg, {
  size: '15px',
});

export default HomePage;
