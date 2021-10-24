// import appConfig from '@/config/app.config';
import { useUtterances } from '@/hooks/useUtterances';
import { styled } from '@stitches.js';

function UtterancsComment() {
  const ref = useUtterances();

  return (
    <Box>
      <CommentBox ref={ref} />
    </Box>
  );
}

const Box = styled('div', {
  position: 'relative',
  mt: '4rem',
});

const CommentBox = styled('section', {
  '& .utterances': {
    width: '100%',
    maxWidth: '100%',
  },
});

export default UtterancsComment;
