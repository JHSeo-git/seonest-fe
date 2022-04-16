import { RefObject, useEffect, useState } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
  freezeOnceVisible?: boolean;
};

export default function useInView(
  elementRef: RefObject<Element>,
  { root, freezeOnceVisible, rootMargin, threshold }: UseInViewOptions = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    setEntry(entry);
  };
  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observer = new IntersectionObserver(updateEntry, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, root, rootMargin, threshold, frozen]);

  return {
    inView: !!entry?.isIntersecting,
    entry,
  };
}
