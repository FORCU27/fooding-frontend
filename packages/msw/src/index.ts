import { setupServer } from 'msw/node';
import { handlers } from './handlers/index';

export * from './components/MSWProvider';
export * from './handlers/index';

export const server = setupServer(...handlers);
