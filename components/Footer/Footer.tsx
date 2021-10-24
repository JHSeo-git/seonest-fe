import { styled } from '@stitches.js';
import GithubIcon from '@/assets/icons/github.svg';
import LogoImage from '@/assets/images/logo.svg';
import Button from '../common/Button';

function Footer() {
  return (
    <Box>
      <FlexBox>
        <LogoImage className="logo" />
      </FlexBox>
      <FlexBox>
        <p className="copywrite">&#169; 2021 &#183; seonest.net</p>
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
