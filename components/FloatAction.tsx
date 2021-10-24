import React, { useState } from 'react';
import { styled } from '@stitches.js';
import Button from './common/Button';
import PlusIcon from '@/assets/icons/plus.svg';
import Pencil1 from '@/assets/icons/pencil1.svg';
import Pencil2 from '@/assets/icons/pencil2.svg';
import Link from 'next/link';
import { useUserValue } from '@/lib/recoil/authState';

type FloatActionProps = {
  editSlug?: string;
};

const FloatAction = ({ editSlug }: FloatActionProps) => {
  const user = useUserValue();
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };

  if (!user) return null;

  return (
    <Wrapper>
      <InnerBox>
        <ButtonBox>
          {open && (
            <>
              {editSlug && (
                <Link href={`/write/${editSlug}`} passHref>
                  <IconButton kind="solidRedScale" shape="round">
                    <Pencil2 className="icon" />
                  </IconButton>
                </Link>
              )}
              <Link href="/write" passHref>
                <IconButton kind="solidGreenScale" shape="round">
                  <Pencil1 className="icon" />
                </IconButton>
              </Link>
            </>
          )}
          <IconButton
            size="small"
            kind="solidBlueScale"
            shape="round"
            rotate={open}
            onClick={onClick}
          >
            <PlusIcon className="icon" />
          </IconButton>
        </ButtonBox>
      </InnerBox>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  zIndex: '$fixed',
  position: 'fixed',
  bottom: '$8',
  right: '$6',
});

const InnerBox = styled('div', {
  position: 'relative',
});

const ButtonBox = styled('div', {
  position: 'absolute',
  bottom: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
});

const IconButton = styled(Button, {
  display: 'flex',
  jc: 'center',
  ai: 'center',
  size: '$6',
  bs: '$muiShadow3',

  '& .icon': {
    size: '$3',
  },

  variants: {
    rotate: {
      true: {
        transform: 'rotate(45deg)',
      },
    },
  },
});

export default FloatAction;
