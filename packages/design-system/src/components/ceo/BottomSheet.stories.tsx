import type { StoryObj } from '@storybook/react';

import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { useState } from 'react';

const meta = {
  title: 'components/ceo/BottomSheet',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectValue, setSelectValue] = useState('');

    return (
      <BottomSheet>
        <BottomSheet.Trigger asChild>
          <Button>열기</Button>
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title>제목</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <BottomSheet.Select value={selectValue} onChange={setSelectValue}>
              <BottomSheet.SelectItem value='1'>전체</BottomSheet.SelectItem>
              <BottomSheet.SelectItem value='2'>외부</BottomSheet.SelectItem>
              <BottomSheet.SelectItem value='3'>음식</BottomSheet.SelectItem>
              <BottomSheet.SelectItem value='4'>최신순</BottomSheet.SelectItem>
            </BottomSheet.Select>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <Button className='w-full' variant='outlined'>
              취소
            </Button>
            <Button className='w-full'>확인</Button>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <BottomSheet open={isOpen} onOpenChange={setIsOpen}>
        <BottomSheet.Trigger asChild>
          <Button>열기</Button>
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title>바텀시트 제목</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body>바텀시트 내용</BottomSheet.Body>
          <BottomSheet.Footer>
            <Button>확인</Button>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet>
    );
  },
};
