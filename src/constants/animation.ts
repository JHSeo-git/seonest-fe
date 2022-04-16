import { keyframes } from '@stitches.js';

export const loadingAnimation = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const shinyAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const slideUpAnimation = keyframes({
  from: {
    transform: 'translate3d(0, 100%, 0)',
  },
  to: {
    transform: 'translate3d(0, 0, 0)',
  },
});
export const slideDownAnimation = keyframes({
  from: {
    transform: 'translate3d(0, 0, 0)',
  },
  to: {
    transform: 'translate3d(0, 100%, 0)',
  },
});

export const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const fadeOut = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});
