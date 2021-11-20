import AppError from '@/components/AppError';
import AppLayout from '@/components/AppLayout';

function OfflineFallbackPage() {
  return (
    <AppLayout layoutType="naked">
      <AppError message="Offline" status="Offline" />
    </AppLayout>
  );
}

export default OfflineFallbackPage;
