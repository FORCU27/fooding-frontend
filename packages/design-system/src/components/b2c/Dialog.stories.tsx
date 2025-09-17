import type { StoryObj } from '@storybook/react';

import { Button } from './Button';
import { Dialog } from './Dialog';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/Dialog',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Dialog>
        <Dialog.Trigger asChild>
          <Button size='small'>열기</Button>
        </Dialog.Trigger>
        <Dialog.Content className='w-[320px]'>
          <Dialog.Header>
            <Dialog.Title>모달 제목</Dialog.Title>
            <Dialog.Description>모달 설명</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>모달 내용</Dialog.Body>
          <Dialog.Footer className='gap-3'>
            <Dialog.Close asChild>
              <Button variant='outlined'>취소</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>추가하기</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <Button size='small'>열기</Button>
        </Dialog.Trigger>
        <Dialog.Content className='w-[320px]'>
          <Dialog.Header>
            <Dialog.Title>모달 제목</Dialog.Title>
            <Dialog.Description>모달 설명</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>모달 내용</Dialog.Body>
          <Dialog.Footer className='gap-3'>
            <Dialog.Close asChild>
              <Button variant='outlined'>취소</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>추가하기</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
};
