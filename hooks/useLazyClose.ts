import { useEffect, useState } from 'react';

export default function useLazyClose(visible: boolean, offInterval: number) {
  const [lazyClosed, setLazyClosed] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (visible) {
      setLazyClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setLazyClosed(true);
      }, offInterval);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible, offInterval]);

  return {
    lazyClosed,
  };
}
