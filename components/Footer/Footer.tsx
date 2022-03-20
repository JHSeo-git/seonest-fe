import { styled } from '@stitches.js';
import Button from '../common/Button';

import { ReactComponent as GithubIcon } from '@/assets/icons/github.svg';
import { ReactComponent as LogoImage } from '@/assets/images/logo.svg';

function Footer() {
  return (
    <Box>
      <FlexBox>
        <LogoImage className="logo" />
      </FlexBox>
      <FlexBox>
        <p className="copywrite">
          &#169; {new Date().getFullYear()} &#183; seonest.net
        </p>
        <Button
          as="a"
          kind="grayScale"
          size="small"
          ghost
          rel="noopener noreferrer"
          href="https://github.com/JHSeo-git"
          target="_blank"
        >
          <GithubIcon className="github" />
        </Button>
      </FlexBox>
    </Box>
  );
}

const Box = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  jc: 'center',
  gap: '$1',
});

const FlexBox = styled('div', {
  display: 'flex',
  jc: 'center',
  ai: 'center',

  '& p': {
    m: 0,
  },

  '& .name': {
    fontWeight: 'bold',
  },
  '& .copywrite': {
    mr: '$2',
    fontSize: '$xs',
    color: '$mauve11',
  },
  '& .logo': {
    color: '$mauve9',
    height: '40px',
  },
  '& .github': {
    size: '20px',
  },
});

export default Footer;
