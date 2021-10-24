import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { dehydrate } from 'react-query/hydration';
import { styled } from '@stitches.js';
import useGetPostsByLatestQuery, {
  prefetchGetPostsByLatestQuery,
} from '@/hooks/query/useGetPostsByLatestQuery';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/SEO/PageSEO';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import PostList from '@/components/PostList';

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

  if (error) {
  }

  return (
    <>
      <PageSEO title="Seonest" description="Seo's honest nest" />
      <AppLayout>
        <Hero>
          <h1>Slow but Steady</h1>
        </Hero>
        <Container>
          <PostList posts={posts} />
          <LinkWrapper>
            <Link href="/posts" passHref>
              <Button
                as="a"
                size="small"
                kind="blueScale"
                css={{
                  display: 'flex',
                  ai: 'center',
                }}
              >
                <span>More</span>
                <ChevronRightIcon />
              </Button>
            </Link>
          </LinkWrapper>
        </Container>
      </AppLayout>
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

export default HomePage;
