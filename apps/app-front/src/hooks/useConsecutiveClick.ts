import { useState, useRef } from 'react';

type UseConsecutiveClickOptions = {
  targetCount: number;
  timeoutMs?: number;
  onSuccess?: () => void;
};

export const useConsecutiveClick = ({
  targetCount,
  timeoutMs = 2000,
  onSuccess,
}: UseConsecutiveClickOptions) => {
  const [clickCount, setClickCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    // 기존 타이머가 있다면 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 클릭 횟수 증가
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    // 목표 횟수에 도달했으면 콜백 실행
    if (newClickCount >= targetCount) {
      // console.log(`${targetCount}번 연속 클릭!`);
      onSuccess?.();
      setClickCount(0); // 클릭 횟수 리셋
      return;
    }

    // 지정된 시간 후에 클릭 횟수 리셋
    timerRef.current = setTimeout(() => {
      setClickCount(0);
    }, timeoutMs);
  };

  const reset = () => {
    setClickCount(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    clickCount,
    handleClick,
    reset,
  };
};
