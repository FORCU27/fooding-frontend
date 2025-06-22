'use client';

import { useRef } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface IntersectionObserverProps {
  onIntersect: () => void;
}

export const IntersectionObserver = ({ onIntersect }: IntersectionObserverProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(observerRef, onIntersect);

  return <div ref={observerRef} role='presentation' />;
};
