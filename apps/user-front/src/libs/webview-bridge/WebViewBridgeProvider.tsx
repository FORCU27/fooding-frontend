import { useBridgeEvent } from './useBridgeEvent';

export const WebViewBridgeProvider = ({ children }: { children: React.ReactNode }) => {
  useBridgeEvent();

  return <>{children}</>;
};
