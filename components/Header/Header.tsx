import Link from 'next/link';
import { keyframes, styled } from '@stitches.js';

import Navigation from './Navigation';
import Container from '../common/Container';

import { ReactComponent as LogoIcon } from '@/assets/images/logo.svg';

function Header() {
  return (
    <Container>
      <FlexBox>
        <Link href="/" passHref={true}>
          <Anchor>
            <LogoIcon />
          </Anchor>
        </Link>
        <Navigation />
      </FlexBox>
    </Container>
  );
}

const FlexBox = styled('div', {
  height: '100%',
  display: 'flex',
  ai: 'center',
});

const logoAnimation = keyframes({
  '0%': {
    color: '$slate10',
  },
  '50%': {
    color: '$sky10',
  },
  '100%': {
    color: '$slate10',
  },
});

const Anchor = styled('a', {
  display: 'flex',

  svg: {
    width: 'auto',
    height: '3rem',

    color: '$slate10',
    // animation: `${logoAnimation} 5s ease infinite`,
  },
});

export default Header;
