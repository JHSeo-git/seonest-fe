import { forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { styled } from '@stitches.js';
import { usePostTitleState } from '@/lib/recoil/writeState';
import { WriteInputs } from './Write';

export type WriteTitleProps = {
  register: UseFormRegister<WriteInputs>;
  placeholder?: string;
};

const WriteTitle = forwardRef<HTMLTextAreaElement, WriteTitleProps>(
  ({ register, placeholder }, ref) => {
    const [postTitle, setPostTitle] = usePostTitleState();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleAutoHeight(e);
      setPostTitle(e.target.value);
    };

    const handleAutoHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.currentTarget.style.height = 'auto';
      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    };

    return (
      <Box>
        <TextAreaBox
          {...register('title')}
          ref={ref}
          rows={1}
          placeholder={placeholder}
          value={postTitle ?? ''}
          onChange={onChange}
          autoFocus
        />
      </Box>
    );
  }
);

WriteTitle.displayName = 'WriteTitle';

const Box = styled('div', {
  display: 'flex',
  ai: 'center',
});

const TextAreaBox = styled('textarea', {
  outline: 'none',
  border: 'none',

  maxHeight: '32rem',
  height: '100%',
  width: '100%',
  display: 'block',
  bc: '$loContrast',
  py: '$1',
  px: '$6',
  fontFamily: 'inherit',
  fontSize: '$4xl',
  fontWeight: 'bold',
  resize: 'none',
  lineHeight: '1.5',
  color: '$mauve12',

  '&::placeholder': {
    color: '$mauve8',
  },

  '@sm': {
    fontSize: '$5xl',
  },
});

export default WriteTitle;
