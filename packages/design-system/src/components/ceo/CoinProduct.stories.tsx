import type { Meta, StoryObj } from '@storybook/react';

import { CoinProduct } from './CoinProduct';

const meta: Meta<typeof CoinProduct> = {
  title: 'Components/ceo/CoinProduct',
  component: CoinProduct,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onOrderClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://via.placeholder.com/180',
    imageAlt: '된장찌개 쿠폰 이미지',
    status: '발급중',
    title: '된장찌개 쿠폰',
    registrationDate: '2025.04.04',
    exchangePoint: 40,
    receivedCount: 100,
    purchaseCount: 4,
    usedCount: 57,
    canceledCount: 39,
  },
};

export const WithRealImage: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1583224994126-3bec135d25f4?w=400&h=400&fit=crop',
    imageAlt: '된장찌개 쿠폰 이미지',
    status: '발급중',
    title: '된장찌개 쿠폰',
    registrationDate: '2025.04.04',
    exchangePoint: 40,
    receivedCount: 100,
    purchaseCount: 4,
    usedCount: 57,
    canceledCount: 39,
  },
};

export const WithoutButton: Story = {
  args: {
    image: 'https://via.placeholder.com/180',
    imageAlt: '김치찌개 쿠폰 이미지',
    status: '발급중',
    title: '김치찌개 쿠폰',
    registrationDate: '2025.03.15',
    exchangePoint: 50,
    receivedCount: 200,
    purchaseCount: 10,
    usedCount: 120,
    canceledCount: 70,
    onOrderClick: undefined,
  },
};

export const CustomStatus: Story = {
  args: {
    image: 'https://via.placeholder.com/180',
    imageAlt: '부대찌개 쿠폰 이미지',
    status: '종료',
    title: '부대찌개 쿠폰',
    registrationDate: '2025.02.01',
    exchangePoint: 60,
    receivedCount: 150,
    purchaseCount: 8,
    usedCount: 100,
    canceledCount: 42,
  },
};

export const ActiveState: Story = {
  args: {
    image: 'https://via.placeholder.com/180',
    imageAlt: '활성화된 쿠폰 이미지',
    status: '발급중',
    title: '활성화된 쿠폰',
    registrationDate: '2025.04.04',
    exchangePoint: 40,
    receivedCount: 100,
    purchaseCount: 4,
    usedCount: 57,
    canceledCount: 39,
    isActive: true,
  },
};
