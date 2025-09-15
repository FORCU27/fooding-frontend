import { StoryObj } from '@storybook/react';
import { Toaster } from './Toaster';
import { Button } from './Button';
import toast from 'react-hot-toast';

const meta = {
  title: 'components/b2c/Toaster',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <Button className='w-fit' size='small' onClick={() => toast('기본 토스트 메시지입니다.')}>
          토스트
        </Button>
      </>
    );
  },
};

export const Success: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <Button
          className='w-fit'
          size='small'
          onClick={() => toast.success('성공 토스트 메시지입니다.')}
        >
          토스트
        </Button>
      </>
    );
  },
};

export const LongMessage: Story = {
  render: () => {
    return (
      <>
        <Toaster />
        <Button
          className='w-fit'
          size='small'
          onClick={() =>
            toast(
              '줄바꿈이 포함된 매우 긴 토스트 메시지입니다. 줄바꿈이 포함된 매우 긴 토스트 메시지입니다. 줄바꿈이 포함된 매우 긴 토스트 메시지입니다.',
            )
          }
        >
          토스트
        </Button>
      </>
    );
  },
};
