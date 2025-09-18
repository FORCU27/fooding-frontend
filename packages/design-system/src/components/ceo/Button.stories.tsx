import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/ceo/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    return <Button variant='primary'>버튼</Button>;
  },
};

export const Outlined: Story = {
  render: () => {
    return <Button variant='outlined'>버튼</Button>;
  },
};

export const PrimaryOutlined: Story = {
  render: () => {
    return <Button variant='primaryOutlined'>버튼</Button>;
  },
};

export const PrimaryPink: Story = {
  render: () => {
    return <Button variant='primaryPink'>버튼</Button>;
  },
};

export const Ghost: Story = {
  render: () => {
    return <Button variant='ghost'>버튼</Button>;
  },
};

export const Disabled: Story = {
  render: () => {
    return <Button disabled>버튼</Button>;
  },
};

export const LongText: Story = {
  render: () => {
    return <Button>매장 정보 관리</Button>;
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <Button asChild>
        <a href='#'>링크</a>
      </Button>
    );
  },
};
