import { MockHandlerGroup, registerHandler } from '../utils/mock';
import { notificationHandlers } from './notification';
import { storeHandlers } from './store';

export const mockHandlerGroups: MockHandlerGroup[] = [notificationHandlers, storeHandlers];

export const handlers = mockHandlerGroups.flatMap((handler) =>
  registerHandler(
    handler.handlers.map((handler) => ({
      ...handler,
      preset: handler.presets[0],
    })),
  ),
);
