import AppError from '@/components/AppError';
import Layout from '@/components/Layout';

function InternalServerErrorPage() {
  return (
    <Layout layoutType="naked">
      <AppError message="Internal Server Error" status="500" />
    </Layout>
  );
}

export default InternalServerErrorPage;
