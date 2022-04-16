import AppError from '@/components/AppError';
import Layout from '@/components/Layout';

function OfflineFallbackPage() {
  return (
    <Layout layoutType="naked">
      <AppError message="Offline" status="Offline" />
    </Layout>
  );
}

export default OfflineFallbackPage;
