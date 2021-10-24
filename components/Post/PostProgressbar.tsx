import { styled } from '@stitches.js';
import { useCallback, useEffect, useState } from 'react';

function PostProgressbar() {
  const [width, setWidth] = useState(0);
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop === 0) {
      setWidth(0);
      return;
    }
    const windowHeight = scrollHeight - clientHeight;
    const currentPercent = (scrollTop / windowHeight) * 100;

    setWidth(currentPercent);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [handleScroll]);

  return (
    <Box>
      <ProgressBar
        style={{
          width: `${width}%`,
        }}
      />
    </Box>
  );
}
const Box = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '$1',
  zIndex: '$max',
  bc: 'transparent',
});
const ProgressBar = styled('div', {
  height: '100%',
  bc: '$sky9',
});

export default PostProgressbar;
