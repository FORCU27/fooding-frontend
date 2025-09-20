import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { ArrowLeftIcon } from '../../icons';

const meta = {
  title: 'Components/ceo/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '카테고리 등록',
  },
};

export const RightPositionIcon: Story = {
  render: () => <IconButton iconPosition='right'>아이콘 버튼</IconButton>,
};

export const OptionIconWith: Story = {
  render: () => <IconButton icon={<ArrowLeftIcon className='size-5' />}>아이콘 버튼</IconButton>,
};
