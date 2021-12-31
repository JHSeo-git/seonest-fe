import { styled } from '@stitches.js';

type EmptyPanelProps = {
  comment?: string;
};

function EmptyPanel({ comment }: EmptyPanelProps) {
  return (
    <EmptyBox>
      <EmptyText>¯\_(ツ)_/¯</EmptyText>
      <h2>{comment ? comment : 'Sorry, There are nothing.'}</h2>
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

const EmptyText = styled('span', {
  fontSize: '$5xl',
  color: '$mauve10',
});

export default EmptyPanel;
