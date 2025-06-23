import { useEffect, useState } from 'react';

export const useScrollVisibility = ({
  threshold,
  ref,
}: {
  threshold: number;
  ref: React.RefObject<HTMLElement | null>;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      setIsVisible(ref.current.scrollTop > threshold);
    };

    onScroll();

    const target = ref.current;

    if (!target) return;

    target.addEventListener('scroll', onScroll);

    return () => {
      target.removeEventListener('scroll', onScroll);
    };
  }, [threshold, ref]);

  return { isVisible };
};
