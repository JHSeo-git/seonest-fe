declare module '*.svg' {
  import * as React from 'react';

  const url: string;
  interface SvgrComponent
    extends React.FunctionComponent<React.SVGAttributes<SVGElement>> {}

  export const ReactComponent: SvgrComponent;
  export default url;
}

interface Window {
  gapi: any | undefined;
  auth2: any | undefined;
  firebase: any | undefined;
}

declare module '@mapbox/rehype-prism';
declare module '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
