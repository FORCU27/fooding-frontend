import { bridge, createWebView, postMessageSchema } from '@webview-bridge/react-native';

export const appBridge = bridge({
  async sum(a: number, b: number) {
    return a + b;
  },
});

export type AppBridge = typeof appBridge;

export const appPostMessageSchema = postMessageSchema({
  androidBackPress: {
    validate: () => {},
  },
});

export type AppPostMessage = typeof appPostMessageSchema;

export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  debug: true,
});
