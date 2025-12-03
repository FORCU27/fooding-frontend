import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/ceo/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Spinner />;
  },
};

export const Small: Story = {
  render: () => {
    return <Spinner size='sm' />;
  },
};

export const Medium: Story = {
  render: () => {
    return <Spinner size='md' />;
  },
};

export const Large: Story = {
  render: () => {
    return <Spinner size='lg' />;
  },
};

export const WithText: Story = {
  render: () => {
    return <Spinner text='로딩 중...' />;
  },
};

export const WithLongText: Story = {
  render: () => {
    return <Spinner size='lg' text='메뉴 정보를 불러오는 중...' />;
  },
};

export const AllSizes: Story = {
  render: () => {
    return (
      <div className='flex items-end gap-8'>
        <Spinner size='sm' />
        <Spinner size='md' />
        <Spinner size='lg' />
      </div>
    );
  },
};
