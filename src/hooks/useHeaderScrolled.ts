import { useCallback, useEffect, useState } from 'react';

export default function useHeaderScrolled() {
  const [scrolled, setScrolled] = useState(false);

  const handleScrolling = useCallback(() => {
    const { top } = document.body.getBoundingClientRect();
    if (top < 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [setScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrolling);

    return () => window.removeEventListener('scroll', handleScrolling);
  }, [handleScrolling]);

  return { scrolled };
}
