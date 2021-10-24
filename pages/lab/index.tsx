import { styled } from '@stitches.js';
import AppLayout from '@/components/AppLayout';
import Container from '@/components/common/Container';
import MagicWand from '@/assets/icons/magic-wand.svg';

function LabPage() {
  return (
    <AppLayout>
      <Container>
        <Title>
          <MagicWand className="icon" />
          <h1 className="text">Lab</h1>
        </Title>
        <ListBox>
          <ListItem></ListItem>
        </ListBox>
      </Container>
    </AppLayout>
  );
}
const Title = styled('div', {
  py: '$3',
  mb: '$3',

  display: 'flex',
  jc: 'center',
  ai: 'center',

  '& .icon': {
    color: '$purple9',
    size: '$9',
  },

  '& .text': {
    m: 0,
    ml: '$4',
    color: '$purple9',
    fontSize: '$6xl',
  },
});

const ListBox = styled('ul', {
  m: 0,
  p: 0,
  listStyle: 'none',
});

const ListItem = styled('li', {});

export default LabPage;
