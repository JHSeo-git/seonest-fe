import useLazyClose from '@/hooks/useLazyClose';
import Modal from '../common/Modal';
import { styled } from '@stitches.js';
import Container from '../common/Container';
import Button from '../common/Button';
import CloseIcon from '@/assets/icons/close.svg';
import MarkdownRender from '../Markdown/MarkdownRender';
import { slideDownAnimation, slideUpAnimation } from '@/lib/styles/animation';

export type PreviewScreenProps = {
  visible: boolean;
  markdown: string;
  onClose: () => void;
};

const PreviewScreen = ({ visible, markdown, onClose }: PreviewScreenProps) => {
  const { lazyClosed } = useLazyClose(visible, 200);

  if (!visible && lazyClosed) return null;

  return (
    <ModalBox visible={visible}>
      <HeaderBox>
        <h1>PREVIEW</h1>
        <IconButton kind="whiteScale" ghost onClick={onClose}>
          <CloseIcon className="icon" />
        </IconButton>
      </HeaderBox>
      <Content>
        <Container>
          <MarkdownRender markdown={markdown} />
        </Container>
      </Content>
    </ModalBox>
  );
};

const ModalBox = styled(Modal, {
  display: 'block',
  width: '100%',
  bc: '$loContrast',

  variants: {
    visible: {
      true: {
        animation: `${slideUpAnimation} 0.2s ease-in-out forwards`,
      },
      false: {
        animation: `${slideDownAnimation} 0.2s ease-in-out forwards`,
      },
    },
  },
});

const HeaderBox = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '$headerHeight',
  width: '100%',
  bc: '$loContrast',
  zIndex: '$1',
  display: 'flex',
  jc: 'space-between',
  ai: 'center',
  px: '$4',
  borderBottom: '1px solid $colors$mauve6',

  '& h1': {
    m: 0,
    fontSize: '$4xl',
    color: '$mauve12',

    '@sm': {
      fontSize: '5xl',
    },
  },
});

const IconButton = styled(Button, {
  display: 'flex',
  jc: 'center',
  ai: 'center',

  '& .icon': {
    size: '$4',
  },
});

// TODO: add margin
const Content = styled('div', {
  position: 'absolute',
  top: '$sizes$headerHeight',
  left: 0,
  right: 0,
  bottom: 0,
  overflowY: 'auto',
});

export default PreviewScreen;
