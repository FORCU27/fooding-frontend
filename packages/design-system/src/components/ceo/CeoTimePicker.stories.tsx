import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CeoTimePicker } from './CeoTimePicker';

const meta = {
  title: 'Components/ceo/CeoTimePicker',
  component: CeoTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CeoTimePicker>;

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
        <CeoTimePicker value={time} onChange={setTime} />
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
