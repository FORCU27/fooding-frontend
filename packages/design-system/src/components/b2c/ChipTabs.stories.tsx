import type { StoryObj } from '@storybook/react';

import { ChipTabs } from './ChipTabs';

const meta = {
  title: 'components/b2c/ChipTabs',
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
      <ChipTabs defaultValue='1'>
        <ChipTabs.List>
          <ChipTabs.Trigger value='1'>홈</ChipTabs.Trigger>
          <ChipTabs.Trigger value='2'>소식</ChipTabs.Trigger>
          <ChipTabs.Trigger value='3'>메뉴</ChipTabs.Trigger>
          <ChipTabs.Trigger value='4'>사진</ChipTabs.Trigger>
          <ChipTabs.Trigger value='5'>리뷰</ChipTabs.Trigger>
        </ChipTabs.List>
        <ChipTabs.Content value='1'>홈</ChipTabs.Content>
        <ChipTabs.Content value='2'>소식</ChipTabs.Content>
        <ChipTabs.Content value='3'>메뉴</ChipTabs.Content>
        <ChipTabs.Content value='4'>사진</ChipTabs.Content>
        <ChipTabs.Content value='5'>리뷰</ChipTabs.Content>
      </ChipTabs>
    );
  },
};

export const HorizontalScroll: Story = {
  render: () => {
    return (
      <ChipTabs defaultValue='1'>
        <ChipTabs.List className='overflow-x-auto w-full scrollbar-hide'>
          <ChipTabs.Trigger value='1'>홈</ChipTabs.Trigger>
          <ChipTabs.Trigger value='2'>소식</ChipTabs.Trigger>
          <ChipTabs.Trigger value='3'>메뉴</ChipTabs.Trigger>
          <ChipTabs.Trigger value='4'>사진</ChipTabs.Trigger>
          <ChipTabs.Trigger value='5'>리뷰</ChipTabs.Trigger>
          <ChipTabs.Trigger value='6'>매장정보</ChipTabs.Trigger>
          <ChipTabs.Trigger value='7'>더보기</ChipTabs.Trigger>
        </ChipTabs.List>
      </ChipTabs>
    );
  },
};
