import useLazyClose from '@/hooks/useLazyClose';
import { styled } from '@stitches.js';
import Button from '../common/Button';
import Modal from '../common/Modal';

type PopupProps = {
  visible: boolean;
  title: string;
  message?: string;
  onCancel?: () => void;
  onOK: () => void;
  openDelay?: boolean;
};

const ANIMATION_ON_INTERVAL = 500;
const ANIMATION_OFF_INTERVAL = 200;

function Popup({
  visible,
  title,
  message,
  onOK,
  onCancel,
  openDelay = false,
}: PopupProps) {
  const { lazyClosed } = useLazyClose(visible, ANIMATION_OFF_INTERVAL);

  if (!visible) return null;

  return (
    <Modal>
      <Box>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
        <FlexBox>
          {onCancel && (
            <Button kind="redScale" onClick={onCancel}>
              CANCEL
            </Button>
          )}
          <Button
            kind="greenScale"
            onClick={onOK}
            style={{
              marginLeft: '10px',
            }}
          >
            OK
          </Button>
        </FlexBox>
      </Box>
    </Modal>
  );
}

const Box = styled('div', {
  width: '25rem',
  display: 'flex',
  flexDirection: 'column',
  bc: '$loContrast',
  br: '$2',
  bs: '$muiShadow3',
  overflow: 'hidden',
});

const Title = styled('h1', {
  m: 0,
  px: '$3',
  py: '$2',
  color: '$loContrast',
  bc: '$crimson11',
  borderBottom: '1px solid $colors$gray6',
});

const Message = styled('p', {
  m: 0,
  my: '$3',
  color: '$mauve11',
});

const FlexBox = styled('div', {
  display: 'flex',
  jc: 'flex-end',
  ai: 'center',
  p: '$3',
});

export default Popup;
