import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const meta = {
  title: 'Components/ceo/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Calendar />;
  },
};

export const Single: Story = {
  render: () => {
    return <Calendar mode='single' />;
  },
};

export const Multiple: Story = {
  render: () => {
    return <Calendar mode='multiple' />;
  },
};

export const RangeSelection: Story = {
  render: () => {
    return <Calendar mode='range' />;
  },
};

export const DisabledDate: Story = {
  render: () => {
    return (
      <Calendar
        mode='range'
        disabled={{
          before: new Date(),
          after: new Date('2025-11-30'),
        }}
      />
    );
  },
};

export const ControlledSingle: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return <Calendar mode='single' selected={selectedDate} onSelect={setSelectedDate} required />;
  },
};

export const ControlledMultiple: Story = {
  render: () => {
    const [selectedDates, setSelectedDates] = useState([new Date()]);

    return (
      <Calendar mode='multiple' selected={selectedDates} onSelect={setSelectedDates} required />
    );
  },
};

export const ControlledRange: Story = {
  render: () => {
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>();

    return (
      <Calendar
        mode='range'
        selected={selectedDateRange}
        onSelect={setSelectedDateRange}
        required
      />
    );
  },
};
