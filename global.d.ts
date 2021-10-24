declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  export default ReactComponent;
}

interface Window {
  gapi: any | undefined;
  auth2: any | undefined;
  firebase: any | undefined;
}

declare module '@mapbox/rehype-prism';
