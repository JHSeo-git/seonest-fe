import { styled } from '@stitches.js';
import { useTheme } from 'next-themes';

import Button from '../common/Button';

import { ReactComponent as Sun } from '@/assets/icons/sun.svg';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const onClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <ToggleButton size="small" ghost onClick={onClick}>
      <Sun />
    </ToggleButton>
  );
}

const ToggleButton = styled(Button, {
  '& svg': {
    size: '15px',
    color: '$hiContrast',
  },
});

export default ThemeToggle;
