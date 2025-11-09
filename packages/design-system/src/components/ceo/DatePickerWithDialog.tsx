'use client';

import { useState, Dispatch, SetStateAction } from 'react';

import { Calendar } from 'lucide-react';

import { Button } from './Button';
import { ChipList } from './ChipList';
import { DatePicker } from './DatePicker';
import { Dialog } from './Dialog';
import RadioButtonGroup from './RadioButtonGroup';
import { cn } from '../../utils';

export type RadioOption = { label: string; value: string };
export type SelectedItem = { date: Date; option?: string };
export type SelectedRangeItem = { startDate: Date; endDate: Date; option?: string };

function formatDate(date: Date | undefined): string {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

function formatDateRange(startDate: Date | undefined, endDate: Date | undefined): string {
  if (!startDate || !endDate) return '';
  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
}

interface DatePickerWithDialogProps {
  title?: string;
  mode?: string;
  placeholder?: string;
  radioOptions?: RadioOption[];
  hasCloseBtn?: boolean;
  hasRadioButtonGroup?: boolean;
  selectionMode?: 'single' | 'multiple';
  datePickerMode?: 'single' | 'range';
  selectedDates?: SelectedItem[] | SelectedItem | null;
  selectedRanges?: SelectedRangeItem[] | SelectedRangeItem | null;
  onChange?: Dispatch<SetStateAction<SelectedItem[] | SelectedItem | null>>;
  onRangeChange?: Dispatch<SetStateAction<SelectedRangeItem[] | SelectedRangeItem | null>>;
}

export const DatePickerWithDialog = ({
  title,
  placeholder,
  radioOptions,
  hasCloseBtn = false,
  hasRadioButtonGroup,
  selectionMode = 'single',
  datePickerMode = 'single',
  onChange,
  onRangeChange,
}: DatePickerWithDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [tempDates, setTempDates] = useState<SelectedItem[]>([]);
  const [tempRanges, setTempRanges] = useState<SelectedRangeItem[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(radioOptions?.[0]?.value || '');

  const setSelectedDates = onChange ?? (() => {});
  const setSelectedRanges = onRangeChange ?? (() => {});

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setTempDates(tempDates.map((item) => ({ ...item, option: value })));
    setTempRanges(tempRanges.map((item) => ({ ...item, option: value })));
  };

  const handleTempDateChange = (date: Date | Date[] | null) => {
    if (!date) {
      setTempDates([]);
      return;
    }

    if (Array.isArray(date)) {
      setTempDates(
        date.map((d) => ({ date: d, option: hasRadioButtonGroup ? selectedOption : undefined })),
      );
    } else {
      setTempDates([{ date, option: hasRadioButtonGroup ? selectedOption : undefined }]);
    }
  };

  const handleTempRangeChange = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return;
    setTempRanges([
      { startDate, endDate, option: hasRadioButtonGroup ? selectedOption : undefined },
    ]);
  };

  const handleConfirm = () => {
    if (datePickerMode === 'single') {
      if (selectionMode === 'single') setSelectedDates(tempDates[0] || null);
      else setSelectedDates(tempDates);
      setTempDates([]);
    } else {
      if (selectionMode === 'single') setSelectedRanges(tempRanges[0] || null);
      else setSelectedRanges(tempRanges);
      setTempRanges([]);
    }
    setDialogOpen(false);
  };

  const chipOptions =
    datePickerMode === 'range'
      ? tempRanges.map((r) => ({
          name: r.option
            ? `${r.option} ${formatDateRange(r.startDate, r.endDate)}`
            : formatDateRange(r.startDate, r.endDate),
          value: formatDateRange(r.startDate, r.endDate),
        }))
      : tempDates.map((d) => ({
          name: d.option ? `${d.option} ${formatDate(d.date)}` : formatDate(d.date),
          value: formatDate(d.date),
        }));

  return (
    <div className='flex flex-col gap-4'>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger asChild>
          <div
            className={cn(
              'flex items-center justify-between border border-gray-3 rounded-lg p-5 cursor-pointer',
              'focus-within:ring-2 focus-within:ring-fooding-purple',
            )}
          >
            {placeholder}
            <Calendar className='w-6 h-6 text-gray-5' />
          </div>
        </Dialog.Trigger>
        <Dialog.Content className='items-center'>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <div className='flex flex-col justify-center items-center'>
              <DatePicker
                mode={datePickerMode}
                selectionMode={selectionMode}
                value={
                  selectionMode === 'single' && datePickerMode === 'single'
                    ? (tempDates[0]?.date ?? null)
                    : undefined
                }
                values={
                  selectionMode === 'multiple' && datePickerMode === 'single'
                    ? tempDates.map((t) => t.date)
                    : undefined
                }
                startDate={datePickerMode === 'range' ? tempRanges[0]?.startDate : undefined}
                endDate={datePickerMode === 'range' ? tempRanges[0]?.endDate : undefined}
                onChange={datePickerMode === 'single' ? handleTempDateChange : undefined}
                onRangeChange={datePickerMode === 'range' ? handleTempRangeChange : undefined}
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
              <div className='flex mt-3'>
                {chipOptions.length > 0 && (
                  <ChipList
                    value={chipOptions.map((c) => c.value)}
                    options={chipOptions}
                    type='multiple'
                    hasCloseBtn={hasCloseBtn}
                    onValueChange={() => {}}
                  />
                )}
              </div>
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={handleConfirm} disabled={chipOptions.length === 0}>
              등록
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};
