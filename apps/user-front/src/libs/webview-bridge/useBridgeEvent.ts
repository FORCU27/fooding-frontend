import { useEffect } from 'react';

import { useFlow } from '@stackflow/react/future';

import { bridge } from '.';

export const useBridgeEvent = () => {
  const flow = useFlow();

  useEffect(() => {
    return bridge.addEventListener('androidBackPress', () => {
      flow.pop(); // TODO: 스택이 비었을 경우 앱 종료 브릿지 메시지 전송
    });
  }, [flow]);
};
