import { StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'components/b2c/Tag',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Gray: Story = {
  render: () => {
    return <Tag variant='gray'>태그</Tag>;
  },
};

export const Primary: Story = {
  render: () => {
    return <Tag variant='primary'>태그</Tag>;
  },
};

export const Red: Story = {
  render: () => {
    return <Tag variant='red'>태그</Tag>;
  },
};

export const Green: Story = {
  render: () => {
    return <Tag variant='green'>태그</Tag>;
  },
};
