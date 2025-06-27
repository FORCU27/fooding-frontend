import type { StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'components/b2c/Skeleton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Rounded: Story = {
  render: () => {
    return <Skeleton shape='rounded' width={240} height={240} />;
  },
};

export const Circle: Story = {
  render: () => {
    return <Skeleton shape='circle' width={80} height={80} />;
  },
};

export const Text: Story = {
  render: () => {
    return <Skeleton shape='text' width={240} height={10} />;
  },
};

export const Card: Story = {
  render: () => {
    return (
      <div className='flex gap-3'>
        <div className='flex flex-col gap-2'>
          <Skeleton shape='rounded' width={220} height={140} />
          <Skeleton shape='text' width={180} height={16} />
          <Skeleton shape='text' width={140} height={12} />
        </div>
      </div>
    );
  },
};

export const Profile: Story = {
  render: () => {
    return (
      <div className='flex items-center gap-2'>
        <Skeleton shape='circle' width={48} height={48} />
        <div className='flex flex-col gap-2'>
          <Skeleton shape='text' width={180} height={18} />
          <Skeleton shape='text' width={140} height={12} />
        </div>
      </div>
    );
  },
};
