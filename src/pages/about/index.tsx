import { styled } from '@stitches.js';

import { PageSEO } from '@/components/SEO';
import Layout from '@/components/Layout';
import Container from '@/components/Container';

function AboutPage() {
  return (
    <>
      <PageSEO url="/about" title="About" description="About JHSeo's Blog" />
      <Layout>
        <Container>
          <Content>
            HI, I&apos;m <Strong>JHSeo</Strong>
          </Content>
          <Content>
            I am very interested in learning for programming. Specially Web
            front-end engineering.
          </Content>
          <Content>
            So, I started this blog. and I have been writing posts about that. I
            learn while writing posts.
          </Content>
          <Content next>
            My motto <Strong>Slow but Steady</Strong>
          </Content>
          <Content>
            I am slow to acquire new knowledge. But I am steady to learn.
          </Content>
          <Content>
            If you see this blog, I hope this blog can be some help.
          </Content>
          <Content>Enjoy your Happy coding.</Content>
        </Container>
      </Layout>
    </>
  );
}

const Strong = styled('strong', {
  br: '$2',
  color: '$blue11',
  bc: '$blue3',
  px: '$2',
  py: '$1',
  mx: '$1',
});

const Content = styled('p', {
  variants: {
    next: {
      true: {
        mt: '$6',
      },
    },
  },
});

export default AboutPage;
