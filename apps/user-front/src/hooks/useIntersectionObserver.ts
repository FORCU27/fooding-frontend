import { RefObject, useEffect } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<HTMLElement | null>,
  onIntersect: () => void,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        onIntersect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, onIntersect]);
};
