import { couponHandlers } from './coupon';
import { notificationHandlers } from './notification';
import { rewardHandlers } from './reward';
import { storeHandlers } from './store';
import { storePostHandlers } from './store-post';
import { MockHandlerGroup, registerHandler } from '../utils/mock';

export const mockHandlerGroups: MockHandlerGroup[] = [
  notificationHandlers,
  storeHandlers,
  storePostHandlers,
  couponHandlers,
  rewardHandlers,
];

export const handlers = mockHandlerGroups.flatMap((handler) =>
  registerHandler(
    handler.handlers.map((handler) => ({
      ...handler,
      preset: handler.presets[0],
    })),
  ),
);
