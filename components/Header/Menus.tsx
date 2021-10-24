import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { styled } from '@stitches.js';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useUserValue } from '@/lib/recoil/authState';
import MenuIcon from '@/assets/icons/menu.svg';
import Button from '../common/Button';
import useAuthManage from '@/hooks/useAuthManage';

const MenuItem = styled('li', {});

const Menus = () => {
  const userValue = useUserValue();
  const { logout } = useAuthManage();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickInSide = () => {
    setVisible(!visible);
  };
  const handleClickOutSide = () => {
    setVisible(false);
  };

  useOnClickOutside(ref, handleClickOutSide);

  return (
    <Box ref={ref}>
      <IconButton size="small" ghost onClick={handleClickInSide}>
        <MenuIcon />
      </IconButton>
      <MenuList visible={visible}>
        <li>
          <Link href="/posts" passHref>
            <LinkBox>Posts</LinkBox>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <LinkBox>About</LinkBox>
          </Link>
        </li>
        <Link href="/lab" passHref>
          <LinkBox>Lab</LinkBox>
        </Link>
        {userValue && (
          <>
            <li>
              <Link href="/write" passHref>
                <LinkBox>New Post</LinkBox>
              </Link>
            </li>
            <li>
              <Link href="/temps" passHref>
                <LinkBox>Temp Posts</LinkBox>
              </Link>
            </li>
            <li>
              <LinkBox as="button" onClick={() => logout()}>
                Logout
              </LinkBox>
            </li>
          </>
        )}
      </MenuList>
    </Box>
  );
};

const Box = styled('div', {
  position: 'relative',
});

const IconButton = styled(Button, {
  '& svg': {
    size: '15px',
    color: '$hiContrast',
  },
});

const MenuList = styled('ul', {
  listStyle: 'none',
  position: 'absolute',
  p: 0,
  m: 0,
  top: '2rem',
  right: 0,

  minWidth: '10rem',
  br: '$2',
  bs: '$muiShadow1',
  overflow: 'hidden',

  display: 'none',

  variants: {
    visible: {
      true: {
        display: 'block',
      },
    },
  },
});

const LinkBox = styled('a', {
  userSelect: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'block',
  textAlign: 'left',

  width: '100%',
  color: '$slate11',
  bc: '$slate1',
  transition: 'background-color 100ms ease',
  p: '$3',
  fontSize: '$sm',

  '@hover': {
    '&:hover': {
      bc: '$slate4',
    },
  },
});

export default Menus;
