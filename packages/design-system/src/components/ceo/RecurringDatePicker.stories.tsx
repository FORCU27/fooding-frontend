import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RecurringDatePicker, { RecurrenceType } from './RecurringDatePicker';

const meta = {
  title: 'Components/ceo/RecurringDatePicker',
  component: RecurringDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    recurrence: {
      control: {
        type: 'radio',
        options: [RecurrenceType.Once, RecurrenceType.Monthly, RecurrenceType.Yearly],
      },
    },
  },
} satisfies Meta<typeof RecurringDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | null>(null);
    const [recurrence, setRecurrence] = useState<RecurrenceType>(RecurrenceType.Once);

    return (
      <div className='w-full h-full flex flex-col items-center gap-4'>
        <p>
          선택한 날짜:{' '}
          {dates && dates.length > 0
            ? dates.map((date) => date.toLocaleDateString()).join(', ')
            : '없음'}
        </p>
        <p>반복 타입: {recurrence}</p>
        <RecurringDatePicker
          values={dates}
          onChange={setDates}
          recurrence={recurrence}
          onRecurrenceChange={setRecurrence}
        />
      </div>
    );
  },
};

export const WithInitialDateAndRecurrence: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | null>([new Date(2025, 7, 30)]);
    const [recurrence, setRecurrence] = useState<RecurrenceType>(RecurrenceType.Monthly);

    return (
      <div className='w-full h-full flex flex-col items-center gap-4'>
        <p>
          선택한 날짜:{' '}
          {dates && dates.length > 0
            ? dates.map((date) => date.toLocaleDateString()).join(', ')
            : '없음'}
        </p>
        <p>반복 타입: {recurrence}</p>
        <RecurringDatePicker
          values={dates}
          onChange={setDates}
          recurrence={recurrence}
          onRecurrenceChange={setRecurrence}
        />
      </div>
    );
  },
};
