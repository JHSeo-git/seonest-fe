import React, { useRef, useState } from 'react';
import Script from 'next/script';
import useGoogleLoginEffect from '@/hooks/useGoogleLoginEffect';
import Button from './common/Button';
import GoogleIcon from '@/assets/icons/google.svg';
import { styled } from '@stitches.js';

function GoogleLoginButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loaded, setLoaded] = useState(false);

  useGoogleLoginEffect(buttonRef, loaded);

  return (
    <>
      <GoogleButton ref={buttonRef} kind="whiteScale">
        <GoogleIcon className="icon" />
        <span className="text">Sign in with Google</span>
      </GoogleButton>

      <Script
        onLoad={() => setLoaded(true)}
        src="https://apis.google.com/js/api:client.js"
      ></Script>
    </>
  );
}

const GoogleButton = styled(Button, {
  width: '100%',
  maxWidth: '25rem',
  height: '$8',

  mx: '$2',
  display: 'flex',
  jc: 'center',
  ai: 'center',

  '& .icon': {
    width: '$5',
    height: '$5',
  },
  '& .text': {
    ml: '$2',
  },
});

export default GoogleLoginButton;
