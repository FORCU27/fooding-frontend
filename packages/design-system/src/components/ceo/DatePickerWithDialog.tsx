'use client';

import { useState } from 'react';

import { Calendar } from 'lucide-react';

import { Button } from './Button';
import { ChipList } from './ChipList';
import { DatePicker } from './DatePicker';
import { Dialog } from './Dialog';
import RadioButtonGroup from './RadioButtonGroup';
import { cn } from '../../utils';

export type RadioOption = { label: string; value: string };
export type SelectedItem = { date: Date; option?: string };

function formatDate(date: Date | undefined): string {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

interface DatePickerWithDialogProps {
  title?: string;
  placeholder?: string;
  radioOptions?: RadioOption[];
  hasCloseBtn?: boolean;
  hasRadioButtonGroup?: boolean;
  selectionMode?: 'single' | 'multiple';
  selectedDates?: SelectedItem[];
  onChange?: (value: SelectedItem[] | SelectedItem | null) => void;
}

export const DatePickerWithDialog = ({
  title,
  placeholder,
  radioOptions,
  hasCloseBtn = true,
  hasRadioButtonGroup,
  selectionMode = 'single',
  selectedDates = [],
  onChange,
}: DatePickerWithDialogProps) => {
  const [tempDates, setTempDates] = useState<SelectedItem[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(radioOptions?.[0]?.value || '');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (tempDates.length > 0 && hasRadioButtonGroup) {
      setTempDates(tempDates.map((item) => ({ ...item, option: value })));
    }
  };

  const handleTempDateChange = (date: Date | Date[] | null | undefined) => {
    if (!date) return;
    if (Array.isArray(date)) {
      setTempDates(
        date.map((d) => ({ date: d, option: hasRadioButtonGroup ? selectedOption : undefined })),
      );
    } else {
      setTempDates([{ date, option: hasRadioButtonGroup ? selectedOption : undefined }]);
    }
  };

  const handleConfirm = () => {
    if (selectionMode === 'single') {
      onChange?.(tempDates.length > 0 ? tempDates[0]! : null);
    } else {
      onChange?.(tempDates);
    }
    setTempDates([]);
  };

  const getOptionLabel = (optionValue: string | undefined): string => {
    if (!optionValue || !radioOptions) return '';
    const option = radioOptions.find((opt) => opt.value === optionValue);
    return option ? option.label : '';
  };

  const tempChipOptions: { name: string; value: string }[] = tempDates
    .slice()
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((d) => ({
      name: d.option ? `${getOptionLabel(d.option)} ${formatDate(d.date)}` : formatDate(d.date),
      value: formatDate(d.date),
    }));

  const tempChipValue =
    tempDates.length > 0 ? formatDate(tempDates[tempDates.length - 1]!.date) : '';

  const finalChipOptions = selectedDates.map((d) => ({
    name: d.option ? `${getOptionLabel(d.option)} ${formatDate(d.date)}` : formatDate(d.date),
    value: formatDate(d.date),
  }));

  const finalChipValue = selectedDates.map((d) => formatDate(d.date));

  return (
    <div className='flex flex-col gap-4'>
      <Dialog
        onOpenChange={(open) => {
          if (open) {
            setTempDates([...selectedDates]);
          }
        }}
      >
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
              ? selectedDates[0]
                ? selectedDates[0].option
                  ? `${getOptionLabel(selectedDates[0].option)} ${formatDate(selectedDates[0].date)}`
                  : formatDate(selectedDates[0].date)
                : tempDates[0]
                  ? tempDates[0].option
                    ? `${getOptionLabel(tempDates[0].option)} ${formatDate(tempDates[0].date)}`
                    : formatDate(tempDates[0].date)
                  : placeholder || '날짜를 선택해주세요'
              : placeholder || '날짜를 선택해주세요'}
            <Calendar className='w-6 h-6 text-gray-5' />
          </div>
        </Dialog.Trigger>
        <Dialog.Content className='w-[400px] items-center'>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <DatePicker
              selectionMode={selectionMode}
              value={selectionMode === 'single' ? (tempDates[0]?.date ?? null) : undefined}
              values={selectionMode === 'multiple' ? tempDates.map((t) => t.date) : undefined}
              onChange={handleTempDateChange}
            />
            {hasRadioButtonGroup && radioOptions && (
              <RadioButtonGroup
                name='date-options'
                options={radioOptions}
                selectedValue={selectedOption}
                onChange={handleOptionChange}
                className='flex gap-6 mt-4 justify-center'
              />
            )}

            {tempDates.length > 0 && (
              <ChipList
                value={tempChipValue}
                options={tempChipOptions}
                type='single'
                hasCloseBtn={false}
                onValueChange={() => {}}
                className='mt-4'
              />
            )}
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button onClick={handleConfirm} disabled={tempDates.length === 0}>
                선택
              </Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>

        {selectionMode === 'multiple' && selectedDates.length > 0 && (
          <ChipList
            value={finalChipValue}
            options={finalChipOptions}
            type='multiple'
            hasCloseBtn={hasCloseBtn}
            onValueChange={(vals) =>
              onChange?.(
                vals.map((v) => ({ date: new Date(v.replace(/\./g, '-')), option: undefined })),
              )
            }
          />
        )}
      </Dialog>
    </div>
  );
};
