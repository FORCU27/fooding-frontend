import { useEffect } from 'react';

import { useFlow } from '@stackflow/react/future';

import { bridge } from '.';

export const useBridgeEvent = () => {
  const flow = useFlow();

  useEffect(() => {
    return bridge.addEventListener('androidBackPress', () => {
      flow.pop();
    });
  }, [flow]);
};
