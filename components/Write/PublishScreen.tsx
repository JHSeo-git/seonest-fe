import { UseFormRegister } from 'react-hook-form';
import { styled } from '@stitches.js';
import useLazyClose from '@/hooks/useLazyClose';
import { slideDownAnimation, slideUpAnimation } from '@/lib/styles/animation';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { WriteInputs } from './Write';
import WriteThumbnail from './WriteThumbnail';

export type PublishScreenProps = {
  isEditPost: boolean;
  visible: boolean;
  title: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  register: UseFormRegister<WriteInputs>;
  onPublish: () => void;
  handleThumbnailUrl: (url: string | undefined) => void;
  onClose: () => void;
};

const PublishScreen = ({
  isEditPost,
  visible,
  title,
  shortDescription,
  thumbnailUrl,
  register,
  onPublish,
  handleThumbnailUrl,
  onClose,
}: PublishScreenProps) => {
  const { lazyClosed } = useLazyClose(visible, 200);

  if (!visible && lazyClosed) return null;

  return (
    <ModalBox visible={visible}>
      <Wrapper>
        <h1>{title}</h1>
        <WriteThumbnail
          thumbnailUrl={thumbnailUrl}
          handleThumbnailUrl={handleThumbnailUrl}
        />
        <TextAreaBox
          {...register('shortDescription')}
          maxLength={160}
          tabIndex={0}
          defaultValue={shortDescription ?? ''}
          placeholder="Please write short description"
        />
        <ButtonBox>
          <Button kind="redScale" onClick={onClose}>
            CANCEL
          </Button>
          <Button
            kind="blueScale"
            onClick={onPublish}
            // loading={loading}
          >
            {isEditPost ? 'UPDATE' : 'SAVE'}
          </Button>
        </ButtonBox>
      </Wrapper>
    </ModalBox>
  );
};

const ModalBox = styled(Modal, {
  display: 'flex',
  jc: 'center',
  ai: 'center',
  bc: '$mauve3',

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

const Wrapper = styled('section', {
  width: '40rem',
  bc: '$loContrast',
  br: '$2',
  p: '$4',
  '& h1': {
    color: '$blue9',
    m: 0,
    mb: '$3',
    fontSize: '$',
  },
});

const ButtonBox = styled('div', {
  display: 'flex',
  jc: 'flex-end',
  ai: 'center',

  '& > button': {
    ml: '$1',
  },
});

const TextAreaBox = styled('textarea', {
  fontFamily: 'inherit',
  resize: 'none',
  outline: 'none',
  border: '1px solid $colors$mauve6',
  br: '$3',
  width: '100%',
  height: '5.25rem',
  p: '$3',
  color: '$mauve12',
  fontSize: '$sm',
  lineHeight: '1.5',
  mb: '$3',

  '&::placeholder': {
    color: '$mauve8',
  },
});

export default PublishScreen;
