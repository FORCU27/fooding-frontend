import '@testing-library/jest-dom/vitest';

import { server } from '@repo/msw/server';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { mockIntersectionObserver } from './mocks/intersection-observer.mock';
import { mockMatchMedia } from './mocks/match-media.mock';
import { mockResizeObserver } from './mocks/resize-observer.mock';

beforeAll(() => {
  server.listen();

  vi.mock('next/navigation', () => import('next-router-mock'));
});

beforeEach(() => {
  mockIntersectionObserver();
  mockResizeObserver();
  mockMatchMedia();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
