import { linkBridge } from '@webview-bridge/web';

// import { AppBridge, AppPostMessage } from '../../../../user-mobile/lib/webview-bridge';
import { AppBridge, AppPostMessage } from './temp';

export const bridge = linkBridge<AppBridge, AppPostMessage>();
