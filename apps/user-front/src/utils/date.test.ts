import { formatDate, formatRelativeTime } from './date';
import { vi } from 'vitest';

describe('formatDate', () => {
  const testCases = [
    { input: '2025-06-23T12:00:00Z', expected: '2025년 06월 23일' },
    { input: '2024-12-31T23:59:59Z', expected: '2024년 12월 31일' },
    { input: '2023-01-01T00:00:00Z', expected: '2023년 01월 01일' },
  ] as const;

  test('올바른 날짜 형식으로 변환해야 합니다.', () => {
    testCases.forEach(({ input, expected }) => {
      const result = formatDate(input);
      expect(result).toBe(expected);
    });
  });
});

describe('formatRelativeTime', () => {
  const baseTime = new Date('2025-06-23T12:00:00Z');

  const testCases = [
    { input: new Date('2025-06-23T11:59:59Z').toISOString(), expected: '방금 전' },
    { input: new Date('2025-06-23T11:59:00Z').toISOString(), expected: '1분 전' },
    { input: new Date('2025-06-23T11:00:00Z').toISOString(), expected: '1시간 전' },
    { input: new Date('2025-06-22T12:00:00Z').toISOString(), expected: '1일 전' },
    { input: new Date('2025-05-23T12:00:00Z').toISOString(), expected: '1개월 전' },
    { input: new Date('2024-06-23T12:00:00Z').toISOString(), expected: '1년 전' },
  ] as const;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(baseTime);
  });

  test('올바른 날짜 형식으로 변환해야 합니다.', () => {
    testCases.forEach(({ input, expected }) => {
      const result = formatRelativeTime(input);
      expect(result).toBe(expected);
    });
  });
});
