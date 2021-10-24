import { useScreenLoadingValue } from '@/lib/recoil/appState';
import useLazyClose from '@/hooks/useLazyClose';
import { styled } from '@stitches.js';
import SpinnerIcon from '@/assets/icons/spinner.svg';
import { fadeIn, fadeOut, loadingAnimation } from '@/lib/styles/animation';

function FullscreenLoader() {
  const screenLoading = useScreenLoadingValue();
  const { lazyClosed } = useLazyClose(screenLoading, 200);

  if (!screenLoading && lazyClosed) return null;

  return (
    <Box visible={lazyClosed}>
      <SpinnerIcon className="icon" />
    </Box>
  );
}

const Box = styled('div', {
  position: 'fixed',
  inset: 0,
  bc: '$mauveA3',
  display: 'flex',
  jc: 'center',
  ai: 'center',
  zIndex: '$max',

  '& .icon': {
    size: '5rem',
    color: '$loContrast',

    animation: `${loadingAnimation} 1s ease-in-out infinite`,
  },

  variants: {
    visible: {
      true: {
        animation: `${fadeIn} 0.5s ease-in-out forwards`,
      },
      false: {
        animation: `${fadeOut} 0.5s ease-in-out forwards`,
        animationDelay: '200ms',
      },
    },
  },
});

export default FullscreenLoader;
