import type { StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/Tabs',
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
      <Tabs defaultValue='1'>
        <Tabs.List>
          <Tabs.Trigger value='1'>홈</Tabs.Trigger>
          <Tabs.Trigger value='2'>소식</Tabs.Trigger>
          <Tabs.Trigger value='3'>메뉴</Tabs.Trigger>
          <Tabs.Trigger value='4'>사진</Tabs.Trigger>
          <Tabs.Trigger value='5'>리뷰</Tabs.Trigger>
          <Tabs.Trigger value='6'>더보기</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='1'>홈</Tabs.Content>
        <Tabs.Content value='2'>소식</Tabs.Content>
        <Tabs.Content value='3'>메뉴</Tabs.Content>
        <Tabs.Content value='4'>사진</Tabs.Content>
        <Tabs.Content value='5'>리뷰</Tabs.Content>
        <Tabs.Content value='6'>더보기</Tabs.Content>
      </Tabs>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    return (
      <Tabs defaultValue='1'>
        <Tabs.List fullWidth>
          <Tabs.Trigger value='1'>홈</Tabs.Trigger>
          <Tabs.Trigger value='2'>소식</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='1'>홈</Tabs.Content>
        <Tabs.Content value='2'>소식</Tabs.Content>
      </Tabs>
    );
  },
};

export const ScrollableList: Story = {
  render: () => {
    return (
      <div className='w-[375px]'>
        <Tabs defaultValue='1' scrollable>
          <Tabs.List>
            <Tabs.Trigger value='1'>홈</Tabs.Trigger>
            <Tabs.Trigger value='2'>소식</Tabs.Trigger>
            <Tabs.Trigger value='3'>메뉴</Tabs.Trigger>
            <Tabs.Trigger value='4'>사진</Tabs.Trigger>
            <Tabs.Trigger value='5'>리뷰</Tabs.Trigger>
            <Tabs.Trigger value='6'>매장정보</Tabs.Trigger>
            <Tabs.Trigger value='7'>더보기</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('1');

    return (
      <Tabs value={value} onChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value='1'>홈</Tabs.Trigger>
          <Tabs.Trigger value='2'>소식</Tabs.Trigger>
          <Tabs.Trigger value='3'>메뉴</Tabs.Trigger>
          <Tabs.Trigger value='4'>사진</Tabs.Trigger>
          <Tabs.Trigger value='5'>리뷰</Tabs.Trigger>
          <Tabs.Trigger value='6'>더보기</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='1'>홈</Tabs.Content>
        <Tabs.Content value='2'>소식</Tabs.Content>
        <Tabs.Content value='3'>메뉴</Tabs.Content>
        <Tabs.Content value='4'>사진</Tabs.Content>
        <Tabs.Content value='5'>리뷰</Tabs.Content>
        <Tabs.Content value='6'>더보기</Tabs.Content>
      </Tabs>
    );
  },
};
