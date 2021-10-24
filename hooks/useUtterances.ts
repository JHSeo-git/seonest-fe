import appConfig from '@/config/app.config';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
// import useIntersectionObserver from './useIntersectionObserver';

export function useUtterances() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
  // lazy loading ... 굳이?
  // const entry = useIntersectionObserver(ref, true);

  const handleRegenerate = useCallback(() => {
    if (!ref?.current) return;
    // if (!entry) return;

    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    // docs - https://utteranc.es/
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('repo', appConfig.utterances.repo);
    script.setAttribute('issue-term', appConfig.utterances.issueTerm);
    script.setAttribute('label', appConfig.utterances.label);

    ref.current.appendChild(script);

    // FIXME: inline style clean up at specific inline style
    // if (!document.head.firstChild) return;
    // if (document.head.firstChild.nodeName.toLocaleLowerCase() === 'style') {
    //   document.head.removeChild(document.head.firstChild);
    // }
  }, [ref]);

  useEffect(() => {
    // dependency: router 포함
    handleRegenerate();
  }, [router, handleRegenerate]);

  return ref;
}
