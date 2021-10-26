import { forwardRef, useCallback, useEffect } from 'react';
import { Editor as EditorType, EditorProps } from '@toast-ui/react-editor';
import { TuiEditorWithForwardedProps } from './TuiEditorWrapper';

import dynamic from 'next/dynamic';
const Editor = dynamic<TuiEditorWithForwardedProps>(
  () => import('./TuiEditorWrapper'),
  { ssr: false }
);

export type TuiEditorProps = EditorProps & {
  markdown?: string;
};

const TuiEditor = forwardRef<
  React.ElementRef<typeof EditorType> | undefined,
  TuiEditorProps
>(({ markdown, ...props }, ref) => {
  // const markdown = usePostMarkdownValue();

  const forceUpdate = useCallback(
    (markdown: string) => {
      if (!ref) return;
      const typeGuardRef = ref as React.MutableRefObject<EditorType>;
      if (!typeGuardRef.current) return;
      typeGuardRef.current.getInstance().setMarkdown(markdown);
    },
    [ref]
  );

  useEffect(() => {
    if (!markdown) return;
    forceUpdate(markdown);
  }, [forceUpdate, markdown]);

  return (
    <Editor
      {...props}
      forwardedRef={ref as React.MutableRefObject<EditorType>}
      height="100%"
      initialValue={markdown ?? ''}
    />
  );
});

TuiEditor.displayName = 'TuiEditor';

export default TuiEditor;
