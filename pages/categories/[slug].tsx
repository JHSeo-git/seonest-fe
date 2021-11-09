import AppLayout from '@/components/AppLayout';
import Container from '@/components/common/Container';

type CategoryPageProps = {
  slug: string;
};

function CategoryPage({ slug }: CategoryPageProps) {
  return (
    <AppLayout>
      <Container>임시 페이지</Container>
    </AppLayout>
  );
}

export default CategoryPage;
