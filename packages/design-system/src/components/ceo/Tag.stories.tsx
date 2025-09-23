import { StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'components/ceo/Tag',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Blue: Story = {
  render: () => {
    return <Tag variant='blue'>태그</Tag>;
  },
};
