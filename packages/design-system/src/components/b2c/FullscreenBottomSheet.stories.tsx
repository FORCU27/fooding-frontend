import type { StoryObj } from '@storybook/react';

import { FullscreenBottomSheet } from './FullscreenBottomSheet';
import { Button } from './Button';

const meta = {
  title: 'components/b2c/FullscreenBottomSheet',
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
      <FullscreenBottomSheet>
        <FullscreenBottomSheet.Trigger asChild>
          <Button size='small'>열기</Button>
        </FullscreenBottomSheet.Trigger>
        <FullscreenBottomSheet.Content>
          <div className='flex justify-center items-center flex-1'>전체화면 바텀시트</div>
        </FullscreenBottomSheet.Content>
      </FullscreenBottomSheet>
    );
  },
};
