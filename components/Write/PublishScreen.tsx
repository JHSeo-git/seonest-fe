import { useState } from 'react';
import { styled } from '@stitches.js';
import { useForm, UseFormGetValues, UseFormRegister } from 'react-hook-form';

import useLazyClose from '@/hooks/useLazyClose';
import { slideDownAnimation, slideUpAnimation } from '@/lib/styles/animation';

import Modal from '../Modal';
import Button from '../Button';
import { WriteInputs } from './Write';
import WriteThumbnail from './WriteThumbnail';

export type PublishScreenProps = {
  isEditPost: boolean;
  visible: boolean;
  getValues: UseFormGetValues<WriteInputs>;
  register: UseFormRegister<WriteInputs>;
  onPublish: () => void;
  handleThumbnailUrl: (url: string | undefined) => void;
  onClose: () => void;
};

const PublishScreen = ({
  isEditPost,
  visible,
  getValues,
  register,
  onPublish,
  handleThumbnailUrl,
  onClose,
}: PublishScreenProps) => {
  const { lazyClosed } = useLazyClose(visible, 200);
  const {
    register: categoryRegister,
    getValues: categoryGetValues,
    reset,
  } = useForm({
    defaultValues: {
      category: '',
    },
  });
  const [localCategories, setLocalCategories] = useState(
    getValues('categories')
  );

  const removeCategory = (category: string) => {
    setLocalCategories(localCategories?.filter((c) => c !== category));
  };

  const addCategory = () => {
    const category = categoryGetValues('category');
    if (!category) return;
    reset({ category: '' });
    if (localCategories?.includes(category)) return;
    setLocalCategories([...(localCategories ?? []), category]);
  };

  const onSubmit = () => {
    if (localCategories) {
      register('categories', { value: localCategories });
    }
    onPublish();
  };

  if (!visible && lazyClosed) return null;

  return (
    <ModalBox visible={visible}>
      <Wrapper>
        <h1>{getValues('title')}</h1>
        <WriteThumbnail
          thumbnailUrl={getValues('thumbnailUrl')}
          handleThumbnailUrl={handleThumbnailUrl}
        />
        <TextAreaBox
          {...register('shortDescription')}
          maxLength={160}
          tabIndex={0}
          defaultValue={getValues('shortDescription') ?? ''}
          placeholder="Please write short description"
        />
        <CategoryArea
          css={{
            mb: '$3',
          }}
        >
          {localCategories?.map((category, i) => (
            <Button
              key={i}
              kind="solidBlueScale"
              shape="pill"
              onClick={() => removeCategory(category)}
            >
              {category}
            </Button>
          ))}
          <CategoryInput
            {...categoryRegister('category')}
            tabIndex={-1}
            placeholder="Type Category"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addCategory();
              }
            }}
          />
        </CategoryArea>
        <ButtonBox>
          <Button kind="redScale" onClick={onClose}>
            CANCEL
          </Button>
          <Button
            kind="blueScale"
            onClick={onSubmit}
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

const CategoryArea = styled('div', {
  display: 'flex',
  ai: 'center',
  flexWrap: 'wrap',
  gap: '$3',
});

const CategoryInput = styled('input', {
  outline: 'none',
  border: 'none',
  display: 'inline-flex',
  jc: 'center',
  ai: 'center',
  px: '$4',
  py: '$2',
  br: '$pill',
  bc: '$mauve3',
  width: '10rem',
  fontSize: '$sm',
  color: '$blue11',
  lineHeight: 1.5,

  '&::placeholder': {
    color: '$mauve10',
  },

  '&:focus, &:focus-visible': {
    bc: '$blue3',
  },
});

export default PublishScreen;
