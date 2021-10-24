import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { styled } from '@stitches.js';

type MarkdownRenderProps = {
  markdown: string;
};

type ComponentType = ReactMarkdownOptions['components'];

const MarkdownRender = ({ markdown }: MarkdownRenderProps) => {
  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypePrism, rehypeSlug, rehypeAutolinkHeadings]}
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
      <Link href={href ?? ''} passHref>
        <a {...props}>{children}</a>
      </Link>
    );
  },
  img: ({ node, src, ...props }) => {
    return <img src={src} loading="lazy" {...props} />;
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
};

const Box = styled('section', {
  px: '$1',
  py: '$2',
  color: '$mauve12',
  lineHeight: '1.5',
  // fontVariantNumeric: 'tabular-nums',

  // hr
  hr: {
    m: '$6',
    borderColor: '$blue6',
  },

  // heading
  'h1, h2, h3, h4': {
    borderBottom: '1px solid $colors$mauve6',
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

export default MarkdownRender;
