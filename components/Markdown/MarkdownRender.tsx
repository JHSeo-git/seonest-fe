import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { styled } from '@stitches.js';
import rehypeVideo from 'rehype-video';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

type MarkdownRenderProps = {
  markdown: string;
};

type ComponentType = ReactMarkdownOptions['components'];

const MarkdownRender = ({ markdown }: MarkdownRenderProps) => {
  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[
          [
            rehypeVideo,
            {
              test: /\/(.*)(.mp4|.mov|.web(p|m))$/,
              details: false,
            },
          ],
          rehypePrism,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              test: ['h1', 'h2', 'h3', 'h4'],
              content: {
                type: 'element',
                tagName: 'svg',
                properties: {
                  xmlns: 'http://www.w3.org/2000/svg',
                  width: '24',
                  height: '24',
                  viewBox: '0 0 24 24',
                  className: ['icon'],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      d: 'M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z',
                      fill: 'currentColor',
                    },
                    children: [],
                  },
                ],
              },
            },
          ],
        ]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
};

const components: ComponentType = {
  a: ({ node, href, children, ...props }) => {
    const external = href?.startsWith('https://');

    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
  img: ({ node, ref, src, alt, placeholder, ...props }) => {
    // TODO: image optimization
    // eslint-disable-next-line @next/next/no-img-element
    // return <img src={src} loading="lazy" {...props} alt={alt} />;
    if (!src) {
      return <ImageEmpty {...props} />;
    }

    const domain = src.startsWith('https://files.seonest.net');

    if (domain) {
      return (
        <ImageWrapper>
          <Image
            {...props}
            className="nextImage"
            src={src}
            alt={alt}
            layout="fill"
            priority={true}
          />
        </ImageWrapper>
      );
    }

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} loading="lazy" {...props} alt={alt} />;
  },
  code: ({ node, ref, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');

    if (inline) {
      return (
        <code className="inline" {...props}>
          {children}
        </code>
      );
    }

    if (!match) {
      <CodeBlock {...props}>{children}</CodeBlock>;
    }

    return (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    );
  },
  pre: ({ node, children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return (
      <PreWrapper>
        <pre className={className} {...props}>
          {children}
        </pre>
        {match && <LanguageLabel>{match[1]}</LanguageLabel>}
      </PreWrapper>
    );
  },
  video: ({ node, ...props }) => {
    return <video {...props} autoPlay muted={true} loop />;
  },
};

const Box = styled('section', {
  px: '$1',
  py: '$2',
  color: '$mauve12',
  lineHeight: '1.75',
  // fontVariantNumeric: 'tabular-nums',

  // hr
  hr: {
    m: '$6',
    borderColor: '$blue6',
  },

  // heading
  'h1, h2, h3, h4': {
    borderBottom: '1px solid $colors$mauve6',
    position: 'relative',

    '& a[aria-hidden=true]': {
      position: 'absolute',
      top: '50%',
      left: '0',
      pr: '$1',
      transform: 'translate(-100%, -50%)',

      display: 'none',

      '& .icon': {
        size: '$3',
        visibility: 'hidden',
      },

      '@sm': {
        display: 'flex',
      },
    },
    '@hover': {
      '&:hover': {
        '& a[aria-hidden=true] .icon': {
          visibility: 'visible',
        },
      },
    },
  },
  h1: {
    fontSize: '$4xl',
    pb: '$3',
  },
  h2: {
    fontSize: '$3xl',
    pb: '$3',
  },
  h3: {
    fontSize: '$2xl',
    pb: '$2',
  },
  h4: {
    fontSize: '$xl',
    pb: '$2',
  },
  h5: {
    fontSize: '$base',
    color: '$mauve11',
  },
  h6: {
    fontSize: '$sm',
    color: '$mauve11',
  },

  // list
  'ul, ol': {
    pl: '$4',
  },
  li: {
    my: '$2',
  },

  // link
  a: {
    color: '$blue10',
    fontWeight: 'bold',
  },

  // blockquote
  blockquote: {
    mx: 0,
    py: '$1',
    pl: '$4',
    pr: '$2',
    bc: '$blue2',
    borderLeft: '$sizes$1 solid $colors$blue8',
  },

  // media
  'audio, canvas, embed, iframe, img, object, svg, video': {
    display: 'block',
    verticalAlign: 'middle',
  },
  'img, video': {
    maxWidth: '100%',
    mx: 'auto',
    my: '$2',
  },

  // indented code, fences code
  pre: {
    p: '1em',
    m: '0.5em 0',
    overflow: 'auto',
    br: '0.3em',
    background: '#2b2b2b',
  },

  // inline
  'code.inline': {
    fontFamily: '$code',
    color: '$pink11',
    bc: '$pink5',
    fontWeight: 'bold',
    px: '0.3em',
    py: '0.1em',
    br: '$1',
  },

  // codeblock pre, code
  'pre[class*="language-"]': {
    p: '1.5em',
    m: '1em 0',
    overflow: 'auto',
    br: '0.3em',
  },

  ':not(pre) > code[class*="language-"], pre[class*="language-"]': {
    background: '#2b2b2b',
  },
});

/**
 * a11y-dark.css
 * @see https://github.com/PrismJS/prism-themes/blob/master/themes/prism-a11y-dark.css
 */
const CodeBlock = styled('code', {
  color: '#f8f8f2',
  background: 'none',
  fontFamily: '$code',
  fontSize: '$sm',
  textAlign: 'left',
  whiteSpace: 'pre',
  wordSpacing: 'normal',
  wordBreak: 'normal',
  wordWrap: 'normal',
  lineHeight: 1.5,

  MozTabSize: 4,
  OTabSize: 4,
  tabSize: 4,

  WebkitHyphens: 'none',
  MozHyphens: 'none',
  msHyphens: 'none',
  hyphens: 'none',

  '.token.comment, .token.prolog, .token.doctype, .token.cdata': {
    color: '#d4d0ab',
  },

  '.token.punctuation': {
    color: '#fefefe',
  },
  '.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted':
    {
      color: '#ffa07a',
    },

  '.token.boolean, .token.number': {
    color: '#00e0e0',
  },

  '.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted':
    {
      color: '#abe338',
    },

  '.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable':
    {
      color: '#00e0e0',
    },

  '.token.atrule, .token.attr-value, .token.function': {
    color: '#ffd700',
  },

  '.token.keyword': {
    color: '#00e0e0',
  },

  '.token.regex, .token.important': {
    color: '#ffd700',
  },

  '.token.important, .token.bold': {
    fontWeight: 'bold',
  },

  '.token.italic': {
    fontStyle: 'italic',
  },

  '.token.entity': {
    cursor: 'help',
  },
});

const PreWrapper = styled('div', {
  position: 'relative',
});

const LanguageLabel = styled('div', {
  userSelect: 'none',
  position: 'absolute',
  top: '0',
  right: '$4',
  bc: '$purple11',
  color: '$loContrast',
  fontSize: '$xs',
  fontWeight: 'bold',
  py: '3px',
  px: '$2',
  bbrr: '$2',
  bblr: '$2',
});

const ImageEmpty = styled('div', {
  width: '100%',
  aspectRatio: '1',
  bc: '$blue7',
  br: '$2',
});

const ImageWrapper = styled('div', {
  width: '100%',
  '& > *': {
    position: 'unset !important',
  },
  '& .nextImage': {
    objectFit: 'contain',
    position: 'relative !important',
    width: '100% !important',
    height: 'unset !important',
  },
});

export default MarkdownRender;
