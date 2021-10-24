import AppError from '@/components/AppError';
import AppLayout from '@/components/AppLayout';

function NotFoundPage() {
  return (
    <AppLayout layoutType="naked">
      <AppError message="Not Found Error" status="404" />
    </AppLayout>
  );
}

export default NotFoundPage;
