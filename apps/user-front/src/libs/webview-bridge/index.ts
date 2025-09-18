import { linkBridge } from '@webview-bridge/web';

import { AppBridge, AppPostMessage } from '../../../../user-mobile/lib/webview-bridge';

export const bridge = linkBridge<AppBridge, AppPostMessage>();
