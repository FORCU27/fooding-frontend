import { renderWithProviders } from '@/tests/utils';
import { NotificationList } from './NotificationList';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('NotificationList', () => {
  test('알림 목록을 정상적으로 표시해야 합니다.', async () => {
    renderWithProviders(<NotificationList />);

    const notifications = await screen.findAllByText('공지사항');
    expect(notifications.length).toBeGreaterThan(0);
  });
});
