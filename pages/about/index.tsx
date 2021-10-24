import React from 'react';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/SEO/PageSEO';
import { keyframes, styled } from '@stitches.js';
import LogoImage from '@/assets/images/logo.svg';

function AboutPage() {
  return (
    <>
      <PageSEO title="About" description="About Seo Nest Blog" />
      <AppLayout>
        <BG />
        <Box>
          <LogoImage className="logo" />
          <H1>Hi👋 I&apos;m JHSeo.</H1>
          {/* <H2>
              I&apos;m a <Strong>developer</Strong>.
            </H2> */}
          {/* <section>
              <h3>Front-end</h3>
              <ul>
                <li>Typescript</li>
                <li>React</li>
                <li>Nextjs</li>
                <li>Recoiljs</li>
                <li>Vercel</li>
                <li>Axios</li>
                <li>@emotion</li>
                <li>@toast-ui/editor</li>
                <li>Markdown-it</li>
              </ul>
              <h3>Back-end</h3>
              <ul>
                <li>Nodejs(Koa)</li>
                <li>Mariadb</li>
                <li>Typeorm</li>
                <li>AWS-EC2</li>
                <li>AWS-S3</li>
                <li>PM2</li>
                <li>nginx</li>
                <li>Cloudflare</li>
              </ul>
            </section> */}
        </Box>
      </AppLayout>
    </>
  );
}

const logoAnimation = keyframes({
  '0%': {
    color: 'transparent',
  },
  '100%': {
    color: '$mauveA10',
  },
});

const fadeInAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-20px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const Box = styled('article', {
  position: 'absolute',
  inset: 0,
  letterSpacing: '0.5px',
  display: 'flex',
  flexDirection: 'column',
  jc: 'center',
  ai: 'center',

  '& .logo': {
    width: '100%',
    height: 'auto',
    maxHeight: '15rem',

    animation: `${logoAnimation} 5s ease forwards, ${fadeInAnimation} 2s ease forwards`,

    '@sm': {
      height: '15rem',
      mx: 0,
    },
  },
});

const H1 = styled('h1', {
  fontSize: '$4xl',
  color: '$mauve11',
});

const H2 = styled('h2', {
  fontSize: '$2xl',
});

const Strong = styled('strong', {
  br: '$2',
  color: '$blue11',
  bc: '$blue3',
  px: '$2',
});

const flowAnimation = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
});

const BG = styled('div', {
  position: 'absolute',
  inset: 0,
  zIndex: '-1',

  backgroundImage:
    'linear-gradient(45deg, $colors$pink6, $colors$plum6, $colors$yellow6, $colors$amber6)',
  backgroundSize: '400% 100%',
  animation: `${flowAnimation} 10s ease infinite`,
});

export default AboutPage;
