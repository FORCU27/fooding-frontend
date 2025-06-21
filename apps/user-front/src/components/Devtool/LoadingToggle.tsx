import { useEffect, useState } from 'react';

type LoadingToggleProps = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

/**
 * 개발 환경에서 로딩 상태를 토글할 수 있는 컴포넌트입니다.
 *
 * "`" 키로 로딩 상태를 토글할 수 있습니다.
 *
 * @example
 * ```tsx
 * <LoadingToggle fallback={<div>Loading...</div>}>
 *  <div>Content goes here</div>
 * </LoadingToggle>
 */
export const LoadingToggle = ({ children, fallback }: LoadingToggleProps) => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '₩') {
        setOn((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return <>{on ? fallback : children}</>;
};
