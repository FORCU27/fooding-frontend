import type { Meta, StoryObj } from '@storybook/react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { useState } from 'react';
import { Input } from './Input';
import { TextField } from './TextField';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/ceo/Dialog',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>열기</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>모달 제목</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button>닫기</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>열기</Button>
      </Dialog.Trigger>
      <Dialog.Content showCloseButton={false}>
        <Dialog.Header>
          <Dialog.Title>모달 제목</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button>닫기</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const ScrollableBody: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>열기</Button>
      </Dialog.Trigger>
      <Dialog.Content showCloseButton={false}>
        <Dialog.Header>
          <Dialog.Title>모달 제목</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <div className='min-h-[2400px]' />
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button>닫기</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const ConfirmDialog: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>열기</Button>
      </Dialog.Trigger>
      <Dialog.Content showCloseButton={false}>
        <Dialog.Header>
          <Dialog.Title>추가 휴무일을 삭제하시겠습니까?</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant='outlined'>취소</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>확인</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <Button>열기</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>모달 제목</Dialog.Title>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button>닫기</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
};

export const CategoryExample: Story = {
  render: () => {
    return (
      <Dialog>
        <Dialog.Trigger asChild>
          <Button>열기</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>카테고리 수정</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Input />
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant='outlined'>삭제</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>저장</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
};

export const MenuExample: Story = {
  render: () => {
    return (
      <Dialog open>
        <Dialog.Trigger asChild>
          <Button>열기</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>메뉴 수정</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className='gap-5'>
            <TextField
              required
              label={
                <div className='flex justify-between'>
                  <TextField.Label>메뉴명</TextField.Label>
                  <div className='flex gap-3'>
                    <Checkbox labelText='대표' />
                    <Checkbox labelText='추천' />
                    <Checkbox labelText='신규' />
                  </div>
                </div>
              }
              maxGraphemeCount={20}
            >
              <TextField.Input />
            </TextField>
            <TextField
              required
              label={
                <div className='flex justify-between'>
                  <TextField.Label>가격</TextField.Label>
                  <Checkbox labelText='변동가격' />
                </div>
              }
              maxGraphemeCount={20}
              format='currency'
            >
              <TextField.Input />
              <TextField.Suffix>원</TextField.Suffix>
            </TextField>
            <TextField
              label={<TextField.Label>메뉴 설명</TextField.Label>}
              maxGraphemeCount={20}
              format='currency'
            >
              <TextField.Textarea className='min-h-20' />
            </TextField>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button>저장</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
};
