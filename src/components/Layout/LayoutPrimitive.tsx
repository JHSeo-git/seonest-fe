import { styled } from '@stitches.js';
import useHeaderScrolled from './useHeaderScrolled.hook';

export function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutBox>{children}</LayoutBox>;
}

export function Header({ children }: { children: React.ReactNode }) {
  const { scrolled } = useHeaderScrolled();

  return <HeaderBox scrolled={scrolled}>{children}</HeaderBox>;
}

export function Main({ children }: { children: React.ReactNode }) {
  return <MainBox>{children}</MainBox>;
}

export function Footer({ children }: { children: React.ReactNode }) {
  return <FooterBox>{children}</FooterBox>;
}

const LayoutBox = styled('div', {
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const HeaderBox = styled('header', {
  width: '100%',
  height: '$headerHeight',
  zIndex: '$fixed',
  bc: '$loContrast',

  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,

  borderBottom: '1px solid transparent',
  transition: 'border 0.2s ease-in-out',

  variants: {
    scrolled: {
      true: {
        borderBottom: '1px solid $colors$gray6',
      },
    },
  },
});

const MainBox = styled('main', {
  pt: '$sizes$headerHeight',
  position: 'relative',
  flex: '1',
});

const FooterBox = styled('footer', {
  height: '$footerHeight',
  borderTop: '1px solid $colors$gray6',
  bc: '$mauve1',
});
