import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from '@/mocks/node';

import '@testing-library/jest-dom/vitest';

beforeAll(() => {
  server.listen();

  vi.mock('next/navigation', () => import('next-router-mock'));
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
