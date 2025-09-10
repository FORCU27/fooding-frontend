import { useEffect, useState } from 'react';

import { DatePicker } from './DatePicker';
import RadioButtonGroup from './RadioButtonGroup';

export enum RecurrenceType {
  Once = 'once',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

type RecurringDatePickerProps = {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  recurrence?: RecurrenceType;
  onRecurrenceChange?: (recurrence: RecurrenceType) => void;
};

const RecurringDatePicker = ({
  value,
  onChange,
  recurrence = RecurrenceType.Once,
  onRecurrenceChange,
}: RecurringDatePickerProps) => {
  const [internalDate, setInternalDate] = useState<Date | null>(value ?? null);
  const [internalRecurrence, setInternalRecurrence] = useState<RecurrenceType>(recurrence);

  useEffect(() => {
    if (recurrence !== undefined) setInternalRecurrence(recurrence);
  }, [recurrence]);

  useEffect(() => {
    if (value !== undefined) setInternalDate(value);
  }, [value]);

  const handleDateChange = (date: Date | null) => {
    setInternalDate(date);
    onChange?.(date);
  };

  return (
    <div className='w-full flex flex-col gap-4 items-center justify-center'>
      <DatePicker value={internalDate} onChange={handleDateChange} />
      <RadioButtonGroup
        selectedValue={internalRecurrence}
        onChange={(value) => {
          const val = value as RecurrenceType;
          setInternalRecurrence(val);
          onRecurrenceChange?.(val);
        }}
        options={[
          { label: '한번만', value: RecurrenceType.Once },
          { label: '매달', value: RecurrenceType.Monthly },
          { label: '매년', value: RecurrenceType.Yearly },
        ]}
        name='DatePickerGroup'
      />
    </div>
  );
};

export default RecurringDatePicker;
