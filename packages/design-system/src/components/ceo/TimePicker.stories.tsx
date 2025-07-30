import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker } from './TimePicker';

const meta = {
  title: 'Components/ceo/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '10:30',
  },
};

export const Controlled: Story = {
  render: () => {
    const [time, setTime] = useState('09:00');
    return (
      <div className='space-y-4'>
        <TimePicker value={time} onChange={setTime} />
        <p className='text-sm'>선택된 시간: {time}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: '15:00',
    disabled: true,
  },
};
