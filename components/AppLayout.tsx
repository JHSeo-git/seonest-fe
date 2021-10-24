import Layout from './common/Layout';
import Footer from './Footer';
import Header from './Header';

type LayoutType = 'basic' | 'naked';

export type AppLayoutProps = {
  layoutType?: LayoutType;
  children: React.ReactNode;
};

function AppLayout({ layoutType = 'basic', children }: AppLayoutProps) {
  if (layoutType === 'naked') {
    return <Layout>{children}</Layout>;
  }
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>{children}</Layout.Main>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default AppLayout;
