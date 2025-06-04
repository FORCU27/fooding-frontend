import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from '@/mocks/node';

import '@testing-library/jest-dom/vitest';

beforeAll(() => {
  server.listen();

  vi.mock('next/navigation', () => import('next-router-mock'));
});

beforeEach(() => {
  const mockIntersectionObserver = vi.fn();

  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
