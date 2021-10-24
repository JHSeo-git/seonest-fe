import { styled } from '@stitches.js';
import Link from 'next/link';
import Button from '../common/Button';
import Menus from './Menus';
import ThemeToggle from './ThemeToggle';

function Navigation() {
  return (
    <NavBox>
      <LinkWrapper>
        <Link href="/posts" passHref>
          <Button
            as="a"
            kind="blueScale"
            size="small"
            ghost
            style={{ fontWeight: 'normal' }}
          >
            Posts
          </Button>
        </Link>
        <Seperator />
      </LinkWrapper>
      <ThemeToggle />
      <Menus />
    </NavBox>
  );
}

const NavBox = styled('nav', {
  ml: 'auto',
  display: 'flex',
  ai: 'center',
  '& > *': {
    ml: '$1',
  },
});

const LinkWrapper = styled('div', {
  display: 'none',
  ai: 'center',

  '@sm': {
    display: 'flex',
  },
});

const Seperator = styled('div', {
  height: '$3',
  width: '1px',
  bc: '$mauve6',
  mx: '$2',
});

export default Navigation;
