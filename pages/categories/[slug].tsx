import AppLayout from '@/components/AppLayout';
import Container from '@/components/common/Container';
import CubeIcon from '@/assets/icons/cube.svg';
import { styled } from '@stitches.js';

type CategoryPageProps = {
  slug: string;
};

function CategoryPage({ slug }: CategoryPageProps) {
  return (
    <AppLayout>
      <Container>
        <Box>
          <CubeIcon />
          <h1>Sorry... Processing...</h1>
        </Box>
      </Container>
    </AppLayout>
  );
}

const Box = styled('div', {
  display: 'flex',
  jc: 'center',
  ai: 'center',

  color: '$crimson10',

  svg: {
    size: '50px',
    mr: '$2',
  },
});

export default CategoryPage;
