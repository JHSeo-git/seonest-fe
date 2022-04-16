import { UseFormRegister } from 'react-hook-form';
import { styled } from '@stitches.js';
import { WriteInputs } from './Write';

export type WriteTitleProps = {
  register: UseFormRegister<WriteInputs>;
  placeholder?: string;
};

const WriteTitle = ({ register, placeholder }: WriteTitleProps) => {
  const handleAutoHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  // TODO: event invoke handleAutoHeight when initial value of ref
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleAutoHeight(e);
  };

  return (
    <Box>
      <TextAreaBox
        {...register('title')}
        // ref={ref}
        rows={1}
        placeholder={placeholder}
        // value={title ?? ''}
        onChange={onChange}
        autoFocus
      />
    </Box>
  );
};

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
