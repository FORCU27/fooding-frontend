import type { StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'components/b2c/EmptyState',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <EmptyState className='h-[320px]' title='알림이 아무것도 없어요.' />;
  },
};
