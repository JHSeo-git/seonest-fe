import { useSetTOCHeadingId } from '@/lib/recoil/viewerState';
import { getScrollTop } from '@/lib/utils/viewerUtils';
import { useCallback, useEffect, useState } from 'react';

type MarkdownItViewEffectProps = {
  ref: React.RefObject<HTMLDivElement>;
  markdown: string;
  fixedTocPos?: number;
  tocLevel?: number;
};

type HeadingType = {
  id: string;
  top: number;
}[];

export default function useMarkdownItViewEffect({
  ref,
  markdown,
  fixedTocPos = 100,
  tocLevel = 4,
}: MarkdownItViewEffectProps) {
  const [tocElement, setTOCElement] = useState<HTMLElement | null>(null);
  const [headingIds, setHeadingIds] = useState<HeadingType>([]);
  const [currentPageHeight, setCurrentPageHeight] = useState(0);
  const setTOCHeadingId = useSetTOCHeadingId();

  const onActivateTOCHeading = useCallback(() => {
    if (!headingIds || headingIds.length === 0) return;
    const scrollTop = getScrollTop();
    const currentHeading = [...headingIds]
      .reverse()
      .find((header) => header.top - 16 <= scrollTop); // 16px = 1rem, margin-top
    if (!currentHeading) {
      setTOCHeadingId(null);
      return;
    }
    setTOCHeadingId(currentHeading.id);
  }, [setTOCHeadingId, headingIds]);

  const onScroll = useCallback(() => {
    if (!tocElement) return;
    if (!window) return;
    if (currentPageHeight !== document.documentElement.scrollHeight) {
      setCurrentPageHeight(document.documentElement.scrollHeight);
      return;
    }
    const { top } = tocElement.getBoundingClientRect();
    if (top < fixedTocPos) {
      tocElement.classList.add('fixed');
    } else {
      tocElement.classList.remove('fixed');
    }
    onActivateTOCHeading();
  }, [tocElement, fixedTocPos, onActivateTOCHeading, currentPageHeight]);

  useEffect(() => {
    if (!markdown) return;
    if (!ref?.current) return;

    // const result = markdownItClient.render('\n[[toc]]\n' + markdown);
    // ref.current.innerHTML = result;
    setTOCElement(ref.current.querySelector('nav'));

    const scrollTop = getScrollTop();
    const targetHeadingEl = Array.from({ length: tocLevel })
      .map((_, i) => `h${i + 1}`)
      .join(',');
    const targetHeadings: HeadingType = [
      ...ref.current.querySelectorAll<HTMLHeadingElement>(targetHeadingEl),
    ].map((h) => ({
      id: h.id,
      top: h.getBoundingClientRect().top + scrollTop,
    }));
    setHeadingIds(targetHeadings);
  }, [ref, markdown, tocLevel, currentPageHeight]);

  useEffect(() => {
    if (!headingIds) return;
    if (headingIds.length === 0) return;
  }, [headingIds]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
}
