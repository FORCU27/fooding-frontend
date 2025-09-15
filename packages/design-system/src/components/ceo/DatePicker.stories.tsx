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
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: '날짜 선택 모드',
    },
    className: { control: 'text' },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const handleDateChange = (selected: Date | Date[] | null) => {
      if (Array.isArray(selected)) {
        setDate(selected[0] || null);
      } else {
        setDate(selected);
      }
    };
    return (
      <div className='w-full h-full flex flex-col'>
        <p className='mt-2'>선택한 날짜: {date?.toLocaleDateString() ?? '없음'}</p>
        <DatePicker value={date} onChange={handleDateChange} />
      </div>
    );
  },
};

export const Selected: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2025, 7, 30));
    const handleDateChange = (selected: Date | Date[] | null) => {
      if (Array.isArray(selected)) {
        setDate(selected[0] || null);
      } else {
        setDate(selected);
      }
    };
    return (
      <div className='w-full h-full flex flex-col'>
        <p className='mt-2'>선택한 날짜: {date?.toLocaleDateString() ?? '없음'}</p>
        <DatePicker value={date} onChange={handleDateChange} />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const handleDateChange = (selected: Date | Date[] | null) => {
      if (Array.isArray(selected)) {
        setDate(selected[0] || null);
      } else {
        setDate(selected);
      }
    };
    return (
      <div className='w-full h-full flex flex-col'>
        <p className='mt-2'>선택한 날짜: {date?.toLocaleDateString() ?? '없음'}</p>
        <DatePicker label='라벨 데이트피커' value={date} onChange={handleDateChange} />
      </div>
    );
  },
};

export const RangeMode: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    
    return (
      <div className='w-full h-full flex flex-col'>
        <div className='mb-4'>
          <p className='text-sm'>시작일: {startDate?.toLocaleDateString('ko-KR') ?? '미선택'}</p>
          <p className='text-sm'>종료일: {endDate?.toLocaleDateString('ko-KR') ?? '미선택'}</p>
        </div>
        <DatePicker 
          mode='range'
          label='날짜 범위 선택'
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
      </div>
    );
  },
};

export const RangeWithInitialValue: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const [startDate, setStartDate] = useState<Date | null>(today);
    const [endDate, setEndDate] = useState<Date | null>(nextWeek);
    
    return (
      <div className='w-full h-full flex flex-col'>
        <div className='mb-4'>
          <p className='text-sm'>시작일: {startDate?.toLocaleDateString('ko-KR') ?? '미선택'}</p>
          <p className='text-sm'>종료일: {endDate?.toLocaleDateString('ko-KR') ?? '미선택'}</p>
        </div>
        <DatePicker 
          mode='range'
          label='날짜 범위 (초기값 설정)'
          startDate={startDate}
          endDate={endDate}
          onRangeChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />
      </div>
    );
  },
};
