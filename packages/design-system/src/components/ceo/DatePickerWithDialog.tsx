'use client';

import { useId, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { Calendar } from 'lucide-react';

import { ChipSelector } from './ChipSelector';
import DatePicker from './DatePicker';
import RadioButtonGroup from './RadioButtonGroup';
import { CloseIcon } from '../../icons';
import { cn } from '../../utils';

type RadioOption = { label: string; value: string };

function formatDate(date: Date | undefined): string {
  if (date === undefined) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

interface DatePickerWithDialogProps {
  title?: string;
  placeHolder?: string;
  radioOptions?: RadioOption[];
  hasCloseBtn?: boolean;
  hasRadioButtonGroup?: boolean;
  selectionMode?: 'single' | 'multiple';
}

export function DatePickerWithDialog({
  title,
  placeHolder,
  radioOptions,
  hasRadioButtonGroup,
  selectionMode = 'single',
}: DatePickerWithDialogProps) {
  const [selectedDates, setSelectedDates] = useState<Date | null | Date[]>(
    selectionMode === 'single' ? null : [],
  );
  const [selectedOption, setSelectedOption] = useState<string>('option1');

  const handleDateChange = (date: Date | null | undefined) => {
    if (!date) return;

    if (selectionMode === 'single') {
      setSelectedDates(date);
    } else {
      const exists =
        Array.isArray(selectedDates) && selectedDates.some((d) => d.getTime() === date.getTime());
      if (!exists) {
        setSelectedDates((prev) => (Array.isArray(prev) ? [...prev, date] : [date]));
      }
    }
  };

  const handleValueChange = (value: string | string[]) => {
    if (selectionMode === 'single') {
      if (typeof value === 'string') setSelectedDates(value ? new Date(value) : null);
    } else {
      if (Array.isArray(value)) setSelectedDates(value.map((v) => new Date(v)));
      else setSelectedDates([]);
    }
  };

  const chipOptions = Array.isArray(selectedDates)
    ? selectedDates
        .slice()
        .sort((a, b) => a.getTime() - b.getTime())
        .map((date) => ({
          name: formatDate(date),
          value: formatDate(date),
        }))
    : selectedDates
      ? [{ name: formatDate(selectedDates), value: formatDate(selectedDates) }]
      : [];

  const chipValue = Array.isArray(selectedDates)
    ? selectedDates.map((date) => formatDate(date))
    : selectedDates
      ? formatDate(selectedDates)
      : '';

  const descriptionId = useId();

  return (
    <div className='flex flex-col gap-4'>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div
            className={cn(
              'flex items-center justify-between border border-gray-3 rounded-lg p-5 cursor-pointer',
              'focus-within:ring-2 focus-within:ring-fooding-purple',
              'placeholder:body-2 text-gray-5',
              selectionMode === 'single' && 'w-full',
            )}
          >
            {selectionMode === 'single'
              ? selectedDates
                ? formatDate(selectedDates as Date)
                : placeHolder || '날짜를 선택해주세요'
              : placeHolder || '날짜를 선택해주세요'}
            <Calendar className='w-6 h-6 text-gray-5' />
          </div>
        </Dialog.Trigger>

        <Dialog.Content className='p-6 w-full bg-white rounded-lg'>
          <Dialog.Title className='sr-only'>{title}</Dialog.Title>

          {title && (
            <div className='flex justify-center items-center mb-3 relative'>
              <h1 className='subtitle-2 text-center'>{title}</h1>
              <Dialog.Close asChild>
                <button type='button' className='absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6'>
                  <CloseIcon className='w-6 h-6' />
                </button>
              </Dialog.Close>
            </div>
          )}

          <Dialog.Description id={descriptionId} className='sr-only'>
            {placeHolder || '날짜 선택 다이얼로그'}
          </Dialog.Description>

          <DatePicker value={null} onChange={(date) => handleDateChange(date)} />
          {hasRadioButtonGroup && radioOptions && (
            <RadioButtonGroup
              name='date-options'
              options={radioOptions}
              selectedValue={selectedOption}
              onChange={setSelectedOption}
              className='flex gap-6 mt-4 justify-center'
            />
          )}
        </Dialog.Content>
      </Dialog.Root>

      {(Array.isArray(selectedDates) ? selectedDates.length > 0 : selectedDates) &&
        (selectionMode === 'single' ? (
          <ChipSelector
            value={selectedDates ? formatDate(selectedDates as Date) : ''}
            hasCloseBtn={false}
            options={chipOptions}
            type='single'
            onValueChange={handleValueChange}
          />
        ) : (
          <ChipSelector
            value={chipValue}
            hasCloseBtn={true}
            options={chipOptions}
            type='multiple'
            onValueChange={handleValueChange}
          />
        ))}
    </div>
  );
}
