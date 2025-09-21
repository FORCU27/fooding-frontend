import { StackflowPluginsEntry } from '@stackflow/react/future';

import { WebViewBridgeProvider } from '@/libs/webview-bridge/WebViewBridgeProvider';

export const wrapPlugin: () => StackflowPluginsEntry = () => () => ({
  key: 'wrapPlugin',
  wrapStack: ({ stack }) => {
    return <WebViewBridgeProvider>{stack.render()}</WebViewBridgeProvider>;
  },
});
