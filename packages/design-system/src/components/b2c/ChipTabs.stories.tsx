import type { StoryObj } from '@storybook/react';

import { ChipTabs } from './ChipTabs';
import { useState } from 'react';

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

export const Secondary: Story = {
  render: () => {
    return (
      <ChipTabs defaultValue='1'>
        <ChipTabs.List variant='secondary'>
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

export const ScrollableList: Story = {
  render: () => {
    return (
      <div className='w-[375px]'>
        <ChipTabs defaultValue='1' scrollable>
          <ChipTabs.List>
            <ChipTabs.Trigger value='1'>홈</ChipTabs.Trigger>
            <ChipTabs.Trigger value='2'>소식</ChipTabs.Trigger>
            <ChipTabs.Trigger value='3'>메뉴</ChipTabs.Trigger>
            <ChipTabs.Trigger value='4'>사진</ChipTabs.Trigger>
            <ChipTabs.Trigger value='5'>리뷰</ChipTabs.Trigger>
            <ChipTabs.Trigger value='6'>매장정보</ChipTabs.Trigger>
            <ChipTabs.Trigger value='7'>더보기</ChipTabs.Trigger>
          </ChipTabs.List>
        </ChipTabs>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('1');

    return (
      <ChipTabs value={value} onChange={setValue}>
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
