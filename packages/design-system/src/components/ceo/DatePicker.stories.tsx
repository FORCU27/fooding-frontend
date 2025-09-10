import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/ceo/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div className='w-full h-full flex flex-col'>
        <p className='mt-2'>선택한 날짜: {date?.toLocaleDateString() ?? '없음'}</p>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Selected: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2025, 7, 30));
    return (
      <div className='w-full h-full flex flex-col'>
        <p className='mt-2'>선택한 날짜: {date?.toLocaleDateString() ?? '없음'}</p>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className='w-full h-full flex flex-col'>
        <p className='mt-2'>선택한 날짜: {date?.toLocaleDateString() ?? '없음'}</p>
        <DatePicker label='라벨 데이트피커' value={date} onChange={setDate} />
      </div>
    );
  },
};
