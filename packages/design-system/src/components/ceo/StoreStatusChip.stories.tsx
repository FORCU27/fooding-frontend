import type { Meta, StoryObj } from '@storybook/react';
import { StoreStatusChip } from './StoreStatusChip';

const meta: Meta<typeof StoreStatusChip> = {
  title: 'Components/ceo/StoreStatusChip',
  component: StoreStatusChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: '영업중',
  },
};

export const BreakTime: Story = {
  args: {
    status: '휴게중',
  },
};

export const Finished: Story = {
  args: {
    status: '영업종료',
  },
};
