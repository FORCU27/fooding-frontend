import { useEffect, useState } from 'react';

import { DatePicker } from './DatePicker';
import RadioButtonGroup from './RadioButtonGroup';

export enum RecurrenceType {
  Once = 'once',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

type RecurringDatePickerProps = {
  values?: Date[] | null;
  onChange?: (dates: Date[] | null) => void;
  recurrence?: RecurrenceType;
  onRecurrenceChange?: (recurrence: RecurrenceType) => void;
  selectionMode?: 'single' | 'multiple';
};

const RecurringDatePicker = ({
  values,
  onChange,
  recurrence = RecurrenceType.Once,
  onRecurrenceChange,
  selectionMode = 'multiple',
}: RecurringDatePickerProps) => {
  const [internalDates, setInternalDates] = useState<Date[] | null>(values ?? null);
  const [internalRecurrence, setInternalRecurrence] = useState<RecurrenceType>(recurrence);

  useEffect(() => {
    if (recurrence !== undefined) setInternalRecurrence(recurrence);
  }, [recurrence]);

  useEffect(() => {
    if (values !== undefined) setInternalDates(values);
  }, [values]);

  const handleDateChange = (dates: Date | Date[] | null) => {
    if (selectionMode === 'single') {
      const newDate = Array.isArray(dates) ? dates[0] || null : dates;
      setInternalDates(newDate ? [newDate] : null);
      onChange?.(newDate ? [newDate] : null);
    } else {
      const newDates = Array.isArray(dates) ? dates : dates ? [dates] : null;
      setInternalDates(newDates);
      onChange?.(newDates);
    }
  };

  return (
    <div className='w-full flex flex-col gap-4 items-center justify-center'>
      <DatePicker
        selectionMode={selectionMode}
        value={selectionMode === 'single' ? (internalDates?.[0] ?? null) : undefined}
        values={selectionMode === 'multiple' ? (internalDates ?? undefined) : undefined}
        onChange={handleDateChange}
      />
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
