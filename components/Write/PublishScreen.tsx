import { UseFormRegister } from 'react-hook-form';
import {
  useIsEditPostValue,
  usePostShortDescriptionValue,
  usePostTitleValue,
  useVisiblePublishScreenState,
} from '@/lib/recoil/writeState';
import { slideDownAnimation, slideUpAnimation } from '@/lib/styles/animation';
import WriteThumbnail from './WriteThumbnail';
import { WriteInputs } from './Write';
import useLazyClose from '@/hooks/useLazyClose';
import Modal from '../common/Modal';
import { styled } from '@stitches.js';
import Button from '../common/Button';

export type PublishScreenProps = {
  register: UseFormRegister<WriteInputs>;
  onPublish: () => void;
  handleThumbnailUrl: (url: string) => void;
};

const PublishScreen = ({
  register,
  onPublish,
  handleThumbnailUrl,
}: PublishScreenProps) => {
  const [visible, setVisible] = useVisiblePublishScreenState();
  const { lazyClosed } = useLazyClose(visible, 200);
  const isEditPost = useIsEditPostValue();
  const title = usePostTitleValue();
  const shortDescription = usePostShortDescriptionValue();

  const onCancel = () => {
    setVisible(false);
  };

  if (!visible && lazyClosed) return null;

  return (
    <ModalBox visible={visible}>
      <Wrapper>
        <h1>{title}</h1>
        <WriteThumbnail handleThumbnailUrl={handleThumbnailUrl} />
        <TextAreaBox
          {...register('shortDescription')}
          maxLength={160}
          tabIndex={0}
          defaultValue={shortDescription ?? ''}
          placeholder="Please write short description"
        />
        <ButtonBox>
          <Button kind="redScale" onClick={onCancel}>
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
