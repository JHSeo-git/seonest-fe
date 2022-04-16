import { styled } from '@stitches.js';

const Modal = styled('div', {
  position: 'fixed',
  inset: 0,
  zIndex: '$modal',

  display: 'flex',
  jc: 'center',
  ai: 'center',
});

export default Modal;
