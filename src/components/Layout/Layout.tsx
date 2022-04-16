import * as LayoutPrimitive from './LayoutPrimitive';
import Footer from '../Footer';
import Header from '../Header';

type LayoutType = 'basic' | 'naked';

export type LayoutProps = {
  layoutType?: LayoutType;
  children: React.ReactNode;
};

function Layout({ layoutType = 'basic', children }: LayoutProps) {
  if (layoutType === 'naked') {
    return <Layout>{children}</Layout>;
  }
  return (
    <LayoutPrimitive.Layout>
      <LayoutPrimitive.Header>
        <Header />
      </LayoutPrimitive.Header>
      <LayoutPrimitive.Main>{children}</LayoutPrimitive.Main>
      <LayoutPrimitive.Footer>
        <Footer />
      </LayoutPrimitive.Footer>
    </LayoutPrimitive.Layout>
  );
}

export default Layout;
