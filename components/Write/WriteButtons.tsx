import { useIsEditPostValue } from '@/lib/recoil/writeState';
import { styled } from '@stitches.js';
import Button from '../common/Button';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import FilePlusIcon from '@/assets/icons/file-plus.svg';
import Pencil2Icon from '@/assets/icons/pencil2.svg';
import CameraIcon from '@/assets/icons/camera.svg';

export type WriteButtonsProps = {
  onBackClick(): void;
  onTempClick(): void;
  onPreviewClick(): void;
  onPostClick(): void;
};

const WriteButtons = ({
  onBackClick,
  onTempClick,
  onPreviewClick,
  onPostClick,
}: WriteButtonsProps) => {
  const isEditPost = useIsEditPostValue();

  return (
    <Box>
      <IconButton
        size="small"
        kind="grayScale"
        responsive
        onClick={onBackClick}
      >
        <ChevronRightIcon className="icon reverse" />
        <span className="text">BACK</span>
      </IconButton>
      <IconButton
        size="small"
        kind="greenScale"
        responsive
        onClick={onTempClick}
      >
        <Pencil2Icon className="icon" />
        <span className="text">TEMP</span>
      </IconButton>
      <IconButton
        size="small"
        kind="redScale"
        responsive
        onClick={onPreviewClick}
      >
        <CameraIcon className="icon" />
        <span className="text">PREVIEW</span>
      </IconButton>
      <IconButton
        size="small"
        kind="blueScale"
        responsive
        onClick={onPostClick}
      >
        <FilePlusIcon className="icon" />
        <span className="text">{isEditPost ? 'UPDATE' : 'POST'}</span>
      </IconButton>
    </Box>
  );
};

const Box = styled('div', {
  height: '$8',
  display: 'flex',
  jc: 'flex-end',
  ai: 'center',
});

const IconButton = styled(Button, {
  width: '100%',
  height: '100%',
  display: 'flex',
  jc: 'center',
  ai: 'center',

  '& .icon': {
    size: '$4',
    display: 'none',

    '@sm': {
      display: 'block',
    },
  },
  '& .reverse': {
    transform: 'rotateY(180deg)',
  },
  '& .text': {
    ml: '$1',
  },

  '@sm': {
    width: 'auto',
    height: 'auto',
    mr: '$2',
  },
});

export default WriteButtons;
