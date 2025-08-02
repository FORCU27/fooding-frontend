import type { Meta, StoryObj } from '@storybook/react';

import { Coupon } from './Coupon';

const meta: Meta<typeof Coupon> = {
  title: 'CEO/Coupon',
  component: Coupon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '쿠폰',
    period: '2025.04.04 - 2025.04.14',
    statuses: ['발급중'],
    receivedCount: 100,
    purchaseCount: 4,
    usedCount: 57,
    canceledCount: 39,
  },
};

export const RegularCustomerOnly: Story = {
  args: {
    title: '단골 고객 전용 쿠폰',
    period: '2025.04.04 - 2025.04.14',
    statuses: ['단골 전용'],
    receivedCount: 50,
    purchaseCount: 2,
    usedCount: 30,
    canceledCount: 18,
  },
};

export const MultipleStatuses: Story = {
  args: {
    title: '쿠폰',
    period: '2025.04.04 - 2025.04.14',
    statuses: ['단골 전용', '발급중'],
    receivedCount: 100,
    purchaseCount: 4,
    usedCount: 57,
    canceledCount: 39,
  },
};

export const ActiveState: Story = {
  args: {
    title: '활성화된 쿠폰',
    period: '2025.04.04 - 2025.04.14',
    statuses: ['발급중'],
    receivedCount: 100,
    purchaseCount: 4,
    usedCount: 57,
    canceledCount: 39,
    isActive: true,
  },
};

export const WithDetails: Story = {
  args: {
    title: '쿠폰',
    period: '2025.04.04 - 2025.04.14',
    statuses: ['발급중'],
    receivedCount: 100,
    purchaseCount: 4,
    usedCount: 57,
    canceledCount: 39,
    details: (
      <>
        <div>- 타 쿠폰과 중복 사용 불가</div>
        <div>- 한 테이블당 한번 사용 가능</div>
      </>
    ),
  },
};
