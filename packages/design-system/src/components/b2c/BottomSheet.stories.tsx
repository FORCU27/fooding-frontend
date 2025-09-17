import type { StoryObj } from '@storybook/react';

import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/BottomSheet',
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
      <BottomSheet>
        <BottomSheet.Trigger asChild>
          <Button size='small'>열기</Button>
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title>바텀시트 제목</BottomSheet.Title>
            <BottomSheet.Description>바텀시트 설명</BottomSheet.Description>
          </BottomSheet.Header>
          <BottomSheet.Body>바텀시트 내용</BottomSheet.Body>
          <BottomSheet.Footer>
            <Button>등록하기</Button>
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
          <Button size='small'>열기</Button>
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title>바텀시트 제목</BottomSheet.Title>
            <BottomSheet.Description>바텀시트 설명</BottomSheet.Description>
          </BottomSheet.Header>
          <BottomSheet.Body>바텀시트 내용</BottomSheet.Body>
          <BottomSheet.Footer>
            <Button>등록하기</Button>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet>
    );
  },
};

export const WithSelect: Story = {
  render: () => {
    const [selectValue, setSelectValue] = useState('1');

    return (
      <BottomSheet>
        <BottomSheet.Trigger asChild>
          <Button size='small'>열기</Button>
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title className='font-bold text-[24px]'>성별 선택</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <BottomSheet.SelectGroup value={selectValue} onChange={setSelectValue}>
              <BottomSheet.SelectItem value='1'>남자</BottomSheet.SelectItem>
              <BottomSheet.SelectItem value='2'>여자</BottomSheet.SelectItem>
              <BottomSheet.SelectItem value='3'>선택안함</BottomSheet.SelectItem>
            </BottomSheet.SelectGroup>
          </BottomSheet.Body>
        </BottomSheet.Content>
      </BottomSheet>
    );
  },
};
