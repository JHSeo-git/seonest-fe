import { useRouter } from 'next/router';
import { styled } from '@stitches.js';
import Button from './common/Button';

export type AppErrorProps = {
  message: string;
  status: '401' | '404' | '500';
};

function AppError({ message, status }: AppErrorProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <Box>
      <FlexBox>
        <h1>{status}</h1>
        <Seperator />
        <p>{message}</p>
      </FlexBox>
      <FlexBox
        style={{
          marginTop: '20px',
        }}
      >
        <Button as="a" kind="redScale" onClick={onClick}>
          Go Back
        </Button>
      </FlexBox>
    </Box>
  );
}

const Box = styled('div', {
  position: 'fixed',
  inset: 0,

  display: 'flex',
  flexDirection: 'column',
  jc: 'center',
  ai: 'center',

  '& h1': {
    m: 0,
    fontSize: '$3xl',
    color: '$mauve11',
  },

  '& p': {
    m: 0,
    fontSize: '$lg',
    color: '$mauve11',
  },
});

const FlexBox = styled('div', {
  display: 'flex',
  ai: 'center',
});

const Seperator = styled('div', {
  mx: '$3',
  height: '$5',
  width: '1px',
  bc: '$mauve8',
});

export default AppError;
