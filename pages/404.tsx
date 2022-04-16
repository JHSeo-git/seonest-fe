import AppError from '@/components/AppError';
import Layout from '@/components/Layout';

function NotFoundPage() {
  return (
    <Layout layoutType="naked">
      <AppError message="Not Found Error" status="404" />
    </Layout>
  );
}

export default NotFoundPage;
