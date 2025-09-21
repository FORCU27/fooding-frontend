import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { EllipsisVerticalIcon } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'Components/ceo/DropdownMenu',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button className='size-6 flex justify-center items-center cursor-pointer'>
            <EllipsisVerticalIcon className='size-5' />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>수정</DropdownMenu.Item>
          <DropdownMenu.Item variant='danger'>삭제</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
};

export const Side: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button className='size-6 flex justify-center items-center cursor-pointer'>
            <EllipsisVerticalIcon className='size-5' />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side='left'>
          <DropdownMenu.Item>수정</DropdownMenu.Item>
          <DropdownMenu.Item variant='danger'>삭제</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
};

export const Align: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button className='size-6 flex justify-center items-center cursor-pointer'>
            <EllipsisVerticalIcon className='size-5' />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align='end'>
          <DropdownMenu.Item>수정</DropdownMenu.Item>
          <DropdownMenu.Item variant='danger'>삭제</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <button className='size-6 flex justify-center items-center cursor-pointer'>
            <EllipsisVerticalIcon className='size-5' />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>수정</DropdownMenu.Item>
          <DropdownMenu.Item variant='danger'>삭제</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
};
