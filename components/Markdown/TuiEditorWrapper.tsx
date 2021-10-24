// import 'prismjs/themes/prism.css';
// import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor, EditorProps } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import { convertSpaceToEncodedString } from '@/lib/utils/viewerUtils';
import useUploadImage from '@/hooks/useUploadImage';
import { styled } from '@stitches.js';

export type TuiEditorWithForwardedProps = EditorProps & {
  forwardedRef?: React.MutableRefObject<Editor>;
};

const TuiEditorWrapper = (props: TuiEditorWithForwardedProps) => {
  const { upload } = useUploadImage();
  return (
    <Box>
      <Editor
        {...props}
        ref={props.forwardedRef}
        previewStyle="vertical"
        hideModeSwitch
        autofocus={false}
        initialEditType="markdown"
        extendedAutolinks={true}
        usageStatistics={false}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const file = blob as File;
            try {
              const imageUrl = await upload({ file, type: 'post' });
              if (!imageUrl) return;
              callback(convertSpaceToEncodedString(imageUrl), file.name);
            } catch (e) {
              // notify(`Image Upload Fail: ${e.name}`, 'error');
            }
          },
        }}
      />
    </Box>
  );
};

/**
 * @see https://github.com/nhn/tui.editor/blob/master/apps/editor/src/css
 * contents.css
 * editor.css
 * md-syntax-highlighting.css
 * preview-highlighting.css
 */
const Box = styled('div', {
  height: '100%',

  // layout
  '.toastui-editor-defaultUI, .toastui-editor-defaultUI .toastui-editor-defaultUI-toolbar':
    {
      br: 0,
    },
  '.toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor': {
    width: '100%',
    '@sm': {
      width: '50%',
    },
  },
  '.toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor-md-splitter':
    {
      display: 'none',
      '@sm': {
        display: 'block',
      },
    },
  '.toastui-editor-main .toastui-editor-md-vertical-style .toastui-editor-md-preview':
    {
      display: 'none',
      p: 0,
      width: 0,
      '@sm': {
        display: 'block',
        p: '0 25px',
        width: '50%',
      },
    },
  '.toastui-editor-main .toastui-editor-md-splitter': {
    bc: '$mauve6',
  },

  // ProseMirror
  '.ProseMirror': {
    fontFamily: 'inherit',
    fontSize: '$base',
    color: '$hiContrast',
    bc: '$loContrast',
  },

  '.ProseMirror .placeholder': {
    color: '$mauve9',
  },

  '.ProseMirror-selectednode': {
    outlineColor: '$sky6',
  },
  'li.ProseMirror-selectednode:after': {
    outlineColor: '$sky6',
  },
  'table.ProseMirror-selectednode, .html-block.ProseMirror-selectednode': {
    outlineColor: '$sky6',
  },

  // TODO: editor override style
  // toastui-editor
  '.toastui-editor-main': {
    bc: '$loContrast',
  },
  '.toastui-editor-main-container': {
    color: '$hiContrast',
    lineHeight: '1.5',
  },
  '.toastui-editor-defaultUI': {
    borderColor: '$mauve6',
    fontFamily: '$base',
    br: 0,
  },
  '.toastui-editor-defaultUI button': {
    color: '$mauve11',
  },

  /**
   * TOOLBAR
   */
  '.toastui-editor-defaultUI-toolbar': {
    bc: '$mauve2',
    borderBottom: '1px solid $mauve6',
  },
  '.toastui-editor-defaultUI-toolbar button': {
    color: '$mauve11',
    border: '1px solid $mauve2',
  },
  // '.toastui-editor-defaultUI-toolbar button:not(:disabled):hover': {
  //   bc: '$mauve8',
  //   border: '1px solid $mauve11',
  // },
  '.toastui-editor-popup-add-heading ul li:hover': {
    bc: '$skyA7',
  },
  '.toastui-editor-toolbar-divider': {
    bc: '$mauve9',
  },
  '.toastui-editor-popup': {
    bc: '$mauve2',
    border: '1px solid $mauve7',
  },
  '.toastui-editor-popup-add-table .toastui-editor-table-description': {
    color: '$mauve11',
  },
  '.toastui-editor-popup-add-table .toastui-editor-table-selection-layer': {
    bc: '$skyA5',
    border: '1px solid $blue9',
  },
  '.toastui-editor-popup-add-table .toastui-editor-table-cell': {
    background: '$mauve1',
    border: '1px solid $mauve6',
  },
  '.toastui-editor-popup-add-table .toastui-editor-table-cell.header': {
    background: '$mauve3',
  },
  '.toastui-editor-popup-add-image .toastui-editor-tabs .tab-item': {
    color: '$mauve11',
    borderBottom: '2px solid $mauve6',
  },
  '.toastui-editor-popup-add-image .toastui-editor-tabs .tab-item:hover': {
    borderBottom: '2px solid $mauve9',
  },
  '.toastui-editor-popup-add-image .toastui-editor-tabs .tab-item.active': {
    color: '$blue10',
    borderBottom: '2px solid $blue10',
  },
  '.toastui-editor-popup-body label': {
    color: '$mauve11',
  },
  '.toastui-editor-popup-add-image .toastui-editor-file-name': {
    color: '$mauve11',
    border: '1px solid $mauve7',
  },
  '.toastui-editor-popup-add-image .toastui-editor-file-select-button': {
    bc: '$mauve1',
    color: '$mauve11',
    border: '1px solid $mauve7',
  },
  '.toastui-editor-popup-add-image .toastui-editor-file-select-button:hover': {
    border: '1px solid $mauve9',
  },
  '.toastui-editor-popup-body input[type=text]': {
    color: '$mauve11',
    border: '1px solid $mauve6',
    bc: '$mauve3',
  },
  '.toastui-editor-popup-body input[type=text]:focus, .toastui-editor-popup-body input[type=text]:focus-visible':
    {
      outline: '1px solid $blue10',
    },
  '.toastui-editor-defaultUI .toastui-editor-close-button': {
    bc: '$mauve1',
    color: '$mauve11',
    border: '1px solid $mauve7',
    outlineColor: '$mauve5',
  },
  '.toastui-editor-defaultUI .toastui-editor-close-button:hover': {
    borderColor: '$mauve9',
  },
  '.toastui-editor-defaultUI .toastui-editor-ok-button': {
    bc: '$blue1',
    color: '$blue11',
    border: '1px solid $blue7',
    outlineColor: '$blue5',
  },
  '.toastui-editor-defaultUI .toastui-editor-ok-button:hover': {
    bc: '$blue3',
  },
  '.toastui-editor-defaultUI-toolbar .scroll-sync': {
    color: '$mauve9',
  },
  '.toastui-editor-defaultUI-toolbar .scroll-sync.active::before': {
    color: '$blue9',
  },
  '.toastui-editor-defaultUI-toolbar .switch': {
    bc: '$mauve8',
  },
  '.toastui-editor-defaultUI-toolbar .switch::before': {
    bc: '$mauve9',
  },
  '.toastui-editor-defaultUI-toolbar input:checked + .switch': {
    bc: '$blue8',
  },
  '.toastui-editor-defaultUI-toolbar input:checked + .switch::before': {
    bc: '$blue9',
  },

  /**
   * EDITOR
   */
  '.toastui-editor-md-heading1': {
    fontSize: '$4xl',
  },
  '.toastui-editor-md-heading2': {
    fontSize: '$3xl',
  },
  '.toastui-editor-md-heading3': {
    fontSize: '$2xl',
  },
  '.toastui-editor-md-heading4': {
    fontSize: '$xl',
  },
  '.toastui-editor-md-heading5': {
    fontSize: '$base',
    color: '$mauve11',
  },
  '.toastui-editor-md-heading6': {
    fontSize: '$sm',
    color: '$mauve11',
  },

  '.toastui-editor-md-block-quote .toastui-editor-md-marked-text, .toastui-editor-md-list-item .toastui-editor-md-meta':
    {
      color: '$mauve10',
    },
  '.toastui-editor-md-delimiter, .toastui-editor-md-thematic-break, .toastui-editor-md-link, .toastui-editor-md-table, .toastui-editor-md-block-quote':
    {
      color: '$mauve10',
    },

  '.toastui-editor-md-link.toastui-editor-md-link-desc.toastui-editor-md-marked-text, .toastui-editor-md-list-item-style.toastui-editor-md-list-item-odd':
    {
      color: '$blue10',
    },
  '.toastui-editor-md-link.toastui-editor-md-link-desc.toastui-editor-md-marked-text .toastui-editor-md-marked-text, .toastui-editor-md-list-item-style.toastui-editor-md-list-item-odd .toastui-editor-md-marked-text':
    {
      color: '$blue10',
    },

  '.toastui-editor-md-meta, .toastui-editor-md-html, .toastui-editor-md-link.toastui-editor-md-link-url.toastui-editor-md-marked-text':
    {
      color: '$mauve10',
    },

  // code inline
  '.toastui-editor-md-code.toastui-editor-md-marked-text': {
    color: '$pink11',
    bc: '$pink5',
    fontWeight: 'bold',
    py: '0.1em',
  },
  '.toastui-editor-md-code.toastui-editor-md-delimiter': {
    color: '$pink11',
    bc: '$pink5',
    fontWeight: 'bold',
    py: '0.1em',
  },
  '.toastui-editor-md-code.toastui-editor-md-start': {
    btlr: '$1',
    bblr: '$1',
    pl: '0.3em',
  },
  '.toastui-editor-md-code.toastui-editor-md-end': {
    btrr: '$1',
    bbrr: '$1',
    pr: '0.3em',
  },

  // code block
  '.toastui-editor-md-code, .toastui-editor-md-code-block': {
    fontFamily: '$code',
    fontSize: '$sm',
    color: '#f8f8f2',
  },
  '.toastui-editor-md-code-block-line-background.start, .toastui-editor-md-custom-block-line-background.start':
    {
      mt: '$2',
    },
  '.toastui-editor-md-code-block-line-background': {
    background: '#2b2b2b', // prismjs @see MarkdownRender.tsx
  },

  // li marked
  '.toastui-editor-contents ul > li::before': {
    mt: '10px',
  },

  /**
   * PREVIEW
   */
  '.toastui-editor-contents': {
    fontFamily: 'inherit',
    fontSize: '$base',
    color: '$hiContrast',
  },
  '.toastui-editor-contents p': {
    color: '$hiContrast',
  },
  '.toastui-editor-contents blockquote p, .toastui-editor-contents blockquote ul, .toastui-editor-contents blockquote ol':
    {
      color: '$mauve10',
    },
  '.toastui-editor-contents blockquote': {
    color: '$mauve10',
    borderLeft: '4px solid $colors$mauve9',
  },
  '.toastui-editor-contents .toastui-editor-md-preview-highlight::after': {
    bc: '$skyA6',
  },

  // heading
  '.toastui-editor-contents h1': {
    color: '$hiContrast',
    fontSize: '$4xl',
    pb: '$3',
    borderBottom: '1px solid $colors$mauve6',
  },
  '.toastui-editor-contents h2': {
    color: '$hiContrast',
    fontSize: '$3xl',
    pb: '$3',
    borderBottom: '1px solid $colors$mauve6',
  },
  '.toastui-editor-contents h3': {
    color: '$hiContrast',
    fontSize: '$2xl',
    pb: '$2',
    borderBottom: '1px solid $colors$mauve6',
  },
  '.toastui-editor-contents h4': {
    color: '$hiContrast',
    fontSize: '$xl',
    pb: '$2',
    borderBottom: '1px solid $colors$mauve6',
  },
  '.toastui-editor-contents h5': {
    color: '$mauve11',
    fontSize: '$base',
  },
  '.toastui-editor-contents h6': {
    color: '$mauve11',
    fontSize: '$sm',
  },

  '.toastui-editor-contents a': {
    color: '$blue10',
  },

  '.toastui-editor-contents del': {
    color: '$mauve10',
  },

  // code inline
  '.toastui-editor-contents code': {
    fontFamily: '$code',
    color: '$pink11',
    bc: '$pink5',
    fontWeight: 'bold',
    px: '0.3em',
    py: '0.1em',
    br: '$1',
  },

  '.toastui-editor-contents pre': {
    background: '#2b2b2b',
    color: '#f8f8f2',
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
  },
  '.toastui-editor-contents pre code': {
    p: 0,
    font: 'inherit',
    color: 'inherit',
    bc: 'inherit',
  },

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

export default TuiEditorWrapper;
