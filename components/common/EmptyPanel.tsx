import { styled } from '@stitches.js';
import UndrawEmpty from '@/assets/images/undraw-empty.svg';

type EmptyPanelProps = {
  comment?: string;
};

function EmptyPanel({ comment }: EmptyPanelProps) {
  return (
    <EmptyBox>
      <UndrawEmpty className="empty" />
      <h2>{comment ? comment : 'There are no content'}</h2>
    </EmptyBox>
  );
}

const EmptyBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  jc: 'center',
  ai: 'center',
  '.empty': {
    my: '$4',
    width: '90%',
    height: 'auto',
  },
  h2: {
    fontSize: '$3xl',
    color: '$mauve10',
  },
});

export default EmptyPanel;
