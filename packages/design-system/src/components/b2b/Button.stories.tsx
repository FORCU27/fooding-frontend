import type { StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'components/b2b/Button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AppMedium: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='app' size='medium' variant='outlined'>
          Button
        </Button>
        <Button area='app' size='medium' variant='active'>
          Button
        </Button>
        <Button area='app' size='medium' disabled>
          Button
        </Button>
      </div>
    );
  },
};

export const AppLong: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='app' size='large' variant='outlined'>
          Button
        </Button>
        <Button area='app' size='large' variant='black'>
          Button
        </Button>
        <Button area='app' size='large' variant='gray' disabled>
          Button
        </Button>
      </div>
    );
  },
};

export const RewardMedium: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='reward' size='medium' variant='primary'>
          Medium
        </Button>
        <Button area='reward' size='medium' action='press'>
          Medium
        </Button>
        <Button area='reward' size='medium' variant='gray'>
          Medium
        </Button>
      </div>
    );
  },
};

export const RewardShort: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='reward' size='small' variant='primary'>
          Button
        </Button>
        <Button area='reward' size='small' action='press'>
          Button
        </Button>
        <Button area='reward' size='small' variant='gray'>
          Button
        </Button>
      </div>
    );
  },
};

export const RewardShortSecondary: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='reward' size='small' variant='secondary'>
          Button
        </Button>
        <Button area='reward' size='small' variant='secondary' action='press'>
          Button
        </Button>
        <Button area='reward' size='small' variant='outlined'>
          Button
        </Button>
      </div>
    );
  },
};

export const RewardShortTertiary: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='reward' size='small' variant='tertiary'>
          Button
        </Button>
        <Button area='reward' size='small' variant='tertiary' action='press'>
          Button
        </Button>
        <Button area='reward' size='small' variant='outlined'>
          Button
        </Button>
      </div>
    );
  },
};

export const RewardMini: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='reward' size='mini' variant='primary'>
          Button
        </Button>
        <Button area='reward' size='mini' action='press'>
          Button
        </Button>
        <Button area='reward' size='mini' variant='gray'>
          Button
        </Button>
      </div>
    );
  },
};

export const RewardMenu: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='reward' size='mini' variant='menu'>
          Menu
        </Button>
        <Button area='reward' size='mini' variant='menu' action='press'>
          Menu
        </Button>
      </div>
    );
  },
};

export const WaitingLarge: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='waiting' size='large' variant='primary'>
          버튼
        </Button>
        <Button area='waiting' size='large' action='press'>
          버튼
        </Button>
        <Button area='waiting' size='large' variant='gray'>
          버튼
        </Button>
      </div>
    );
  },
};

export const WaitingMedium: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='waiting' size='medium' variant='primary'>
          버튼
        </Button>
        <Button area='waiting' size='medium' action='press'>
          버튼
        </Button>
        <Button area='waiting' size='medium' variant='gray'>
          버튼
        </Button>
      </div>
    );
  },
};

export const WaitingShort: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-4'>
        <Button area='waiting' size='small' variant='primary'>
          버튼
        </Button>
        <Button area='waiting' size='small' action='press'>
          버튼
        </Button>
        <Button area='waiting' size='small' variant='gray'>
          버튼
        </Button>
      </div>
    );
  },
};
