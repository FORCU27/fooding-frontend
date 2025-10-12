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
  hasCloseBtn = true,
  hasRadioButtonGroup,
  selectionMode = 'single',
  datePickerMode = 'single',
  selectedDates: externalSelectedDates,
  selectedRanges: externalSelectedRanges,
  onChange,
  onRangeChange,
}: DatePickerWithDialogProps) => {
  // 내부 상태: 외부에서 selectedDates가 제공되면 사용, 아니면 useState값 사용
  const [internalSelectedDates, setInternalSelectedDates] = useState<
    SelectedItem[] | SelectedItem | null
  >(selectionMode === 'single' ? null : []);

  const [internalSelectedRanges, setInternalSelectedRanges] = useState<
    SelectedRangeItem[] | SelectedRangeItem | null
  >(selectionMode === 'single' ? null : []);

  // 외부 상태가 있으면 외부 상태를 우선, 없으면 useState값 사용
  const selectedDates = externalSelectedDates ?? internalSelectedDates;
  const setSelectedDates = onChange ?? setInternalSelectedDates;

  const selectedRanges = externalSelectedRanges ?? internalSelectedRanges;
  const setSelectedRanges = onRangeChange ?? setInternalSelectedRanges;

  // 다이얼로그 안 임시 선택값
  const [tempDates, setTempDates] = useState<SelectedItem[]>([]);
  const [tempRanges, setTempRanges] = useState<SelectedRangeItem[]>([]);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

  const [selectedOption, setSelectedOption] = useState<string>(radioOptions?.[0]?.value || '');

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (tempDates.length > 0 && hasRadioButtonGroup) {
      setTempDates(tempDates.map((item) => ({ ...item, option: value })));
    }
  };

  const handleTempDateChange = (date: Date | Date[] | null) => {
    if (!date) return;
    if (Array.isArray(date)) {
      setTempDates(
        date.map((d) => ({ date: d, option: hasRadioButtonGroup ? selectedOption : undefined })),
      );
    } else {
      setTempDates([{ date, option: hasRadioButtonGroup ? selectedOption : undefined }]);
    }
  };

  // 범위 선택 시
  const handleTempRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    if (startDate && endDate) {
      setTempRanges([
        { startDate, endDate, option: hasRadioButtonGroup ? selectedOption : undefined },
      ]);
    }
  };

  // 선택 버튼 클릭 시 확정
  const handleConfirm = () => {
    if (datePickerMode === 'range') {
      if (selectionMode === 'single') {
        setSelectedRanges(tempRanges[0] || null);
      } else {
        setSelectedRanges((prev) => {
          const newItem = tempRanges[0];
          if (!newItem) return prev ?? [];
          const prevArray = Array.isArray(prev) ? prev : prev ? [prev] : [];
          // 이미 같은 범위+옵션 존재하면 추가하지 않음
          if (
            prevArray.some(
              (d) =>
                d.startDate.getTime() === newItem.startDate.getTime() &&
                d.endDate.getTime() === newItem.endDate.getTime() &&
                d.option === newItem.option,
            )
          ) {
            return prevArray;
          }
          return [...prevArray, newItem].sort(
            (a, b) => a.startDate.getTime() - b.startDate.getTime(),
          );
        });
      }
      setTempRanges([]);
      setTempStartDate(null);
      setTempEndDate(null);
    } else {
      if (selectionMode === 'single') {
        setSelectedDates(tempDates[0] || null);
      } else {
        setSelectedDates((prev) => {
          const newItem = tempDates[0];
          if (!newItem) return prev ?? [];
          const prevArray = Array.isArray(prev) ? prev : prev ? [prev] : [];
          // 이미 같은 날짜+옵션 존재하면 추가하지 않음
          if (
            prevArray.some(
              (d) => d.date.getTime() === newItem.date.getTime() && d.option === newItem.option,
            )
          ) {
            return prevArray;
          }
          return [...prevArray, newItem].sort((a, b) => a.date.getTime() - b.date.getTime());
        });
      }
      setTempDates([]);
    }
  };

  const getOptionLabel = (optionValue: string | undefined): string => {
    if (!optionValue || !radioOptions) return '';
    const option = radioOptions.find((opt) => opt.value === optionValue);
    return option ? option.label : '';
  };

  // 임시 Chip 옵션/값
  const tempChipOptions: { name: string; value: string }[] =
    datePickerMode === 'range'
      ? (tempRanges ?? [])
          .filter((r): r is SelectedRangeItem => !!r && !!r.startDate && !!r.endDate)
          .slice()
          .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
          .map((r) => ({
            name: r.option
              ? `${getOptionLabel(r.option)} ${formatDateRange(r.startDate, r.endDate)}`
              : formatDateRange(r.startDate, r.endDate),
            value: formatDateRange(r.startDate, r.endDate),
          }))
      : (tempDates ?? [])
          .filter((d): d is SelectedItem => !!d && !!d.date)
          .slice()
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((d) => ({
            name: d.option
              ? `${getOptionLabel(d.option)} ${formatDate(d.date)}`
              : formatDate(d.date),
            value: formatDate(d.date),
          }));

  const tempChipValue =
    datePickerMode === 'range'
      ? tempRanges.length > 0
        ? formatDateRange(
            tempRanges[tempRanges.length - 1]!.startDate,
            tempRanges[tempRanges.length - 1]!.endDate,
          )
        : ''
      : tempDates.length > 0
        ? formatDate(tempDates[tempDates.length - 1]!.date)
        : '';

  // 확정 Chip 옵션/값
  const finalArray =
    datePickerMode === 'range'
      ? selectionMode === 'single'
        ? []
        : Array.isArray(selectedRanges)
          ? selectedRanges
          : selectedRanges
            ? [selectedRanges]
            : []
      : selectionMode === 'single'
        ? []
        : Array.isArray(selectedDates)
          ? selectedDates
          : selectedDates
            ? [selectedDates]
            : [];

  const finalChipOptions =
    datePickerMode === 'range'
      ? (finalArray as SelectedRangeItem[]).map((r) => ({
          name: r.option
            ? `${getOptionLabel(r.option)} ${formatDateRange(r.startDate, r.endDate)}`
            : formatDateRange(r.startDate, r.endDate),
          value: r.option
            ? `${getOptionLabel(r.option)} ${formatDateRange(r.startDate, r.endDate)}`
            : formatDateRange(r.startDate, r.endDate),
        }))
      : (finalArray as SelectedItem[]).map((d) => ({
          name: d.option ? `${getOptionLabel(d.option)} ${formatDate(d.date)}` : formatDate(d.date),
          value: d.option
            ? `${getOptionLabel(d.option)} ${formatDate(d.date)}`
            : formatDate(d.date),
        }));

  const finalChipValue =
    selectionMode === 'single'
      ? tempChipValue
      : datePickerMode === 'range'
        ? (finalArray as SelectedRangeItem[]).map((r) =>
            r.option
              ? `${getOptionLabel(r.option)} ${formatDateRange(r.startDate, r.endDate)}`
              : formatDateRange(r.startDate, r.endDate),
          )
        : (finalArray as SelectedItem[]).map((d) =>
            d.option ? `${getOptionLabel(d.option)} ${formatDate(d.date)}` : formatDate(d.date),
          );

  return (
    <div className='flex flex-col gap-4'>
      <Dialog
        onOpenChange={(open) => {
          if (open) {
            if (datePickerMode === 'range') {
              const rangeCopy =
                selectionMode === 'single'
                  ? selectedRanges
                    ? [selectedRanges as SelectedRangeItem]
                    : []
                  : Array.isArray(selectedRanges)
                    ? [...selectedRanges]
                    : selectedRanges
                      ? [selectedRanges]
                      : [];
              setTempRanges(rangeCopy);
              if (rangeCopy.length > 0 && rangeCopy[0]) {
                setTempStartDate(rangeCopy[0].startDate);
                setTempEndDate(rangeCopy[0].endDate);
              }
            } else {
              const copy =
                selectionMode === 'single'
                  ? selectedDates
                    ? [selectedDates as SelectedItem]
                    : []
                  : Array.isArray(selectedDates)
                    ? [...selectedDates]
                    : selectedDates
                      ? [selectedDates]
                      : [];
              setTempDates(copy);
            }
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
              ? datePickerMode === 'range'
                ? selectedRanges
                  ? (selectedRanges as SelectedRangeItem).option
                    ? `${getOptionLabel((selectedRanges as SelectedRangeItem).option)} ${formatDateRange((selectedRanges as SelectedRangeItem).startDate, (selectedRanges as SelectedRangeItem).endDate)}`
                    : formatDateRange(
                        (selectedRanges as SelectedRangeItem).startDate,
                        (selectedRanges as SelectedRangeItem).endDate,
                      )
                  : tempRanges[0]
                    ? tempRanges[0].option
                      ? `${getOptionLabel(tempRanges[0].option)} ${formatDateRange(tempRanges[0].startDate, tempRanges[0].endDate)}`
                      : formatDateRange(tempRanges[0].startDate, tempRanges[0].endDate)
                    : placeholder || '날짜 범위를 선택해주세요'
                : selectedDates
                  ? (selectedDates as SelectedItem).option
                    ? `${getOptionLabel((selectedDates as SelectedItem).option)} ${formatDate((selectedDates as SelectedItem).date)}`
                    : formatDate((selectedDates as SelectedItem).date)
                  : tempDates[0]
                    ? tempDates[0].option
                      ? `${getOptionLabel(tempDates[0].option)} ${formatDate(tempDates[0].date)}`
                      : formatDate(tempDates[0].date)
                    : placeholder || '날짜를 선택해주세요'
              : placeholder || '날짜를 선택해주세요'}
            <Calendar className='w-6 h-6 text-gray-5' />
          </div>
        </Dialog.Trigger>
        <Dialog.Content className='items-center'>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <DatePicker
              mode={datePickerMode}
              selectionMode={selectionMode}
              value={datePickerMode === 'single' && selectionMode === 'single' ? (tempDates[0]?.date ?? null) : undefined}
              values={datePickerMode === 'single' && selectionMode === 'multiple' ? tempDates.map((t) => t.date) : undefined}
              startDate={datePickerMode === 'range' ? tempStartDate : undefined}
              endDate={datePickerMode === 'range' ? tempEndDate : undefined}
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

            {((datePickerMode === 'single' && tempDates.length > 0) || (datePickerMode === 'range' && tempRanges.length > 0)) && (
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
              <Button onClick={handleConfirm} disabled={datePickerMode === 'single' ? tempDates.length === 0 : tempRanges.length === 0}>
                선택
              </Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>

        {selectionMode === 'multiple' &&
          ((datePickerMode === 'single' && Array.isArray(selectedDates) && selectedDates.length > 0) ||
           (datePickerMode === 'range' && Array.isArray(selectedRanges) && selectedRanges.length > 0)) && (
            <ChipList
              value={Array.isArray(finalChipValue) ? finalChipValue : [finalChipValue]}
              options={finalChipOptions}
              type='multiple'
              hasCloseBtn={hasCloseBtn}
              onValueChange={(vals) => {
                if (datePickerMode === 'single') {
                  onChange?.(
                    vals.map((v) => ({ date: new Date(v.replace(/\./g, '-')), option: undefined })),
                  );
                } else {
                  // Range 모드일 때는 날짜 범위를 파싱해서 처리
                  const ranges = vals.map((v) => {
                    const match = v.match(/(\d{4}\.\d{2}\.\d{2}) ~ (\d{4}\.\d{2}\.\d{2})/);
                    if (match && match[1] && match[2]) {
                      return {
                        startDate: new Date(match[1].replace(/\./g, '-')),
                        endDate: new Date(match[2].replace(/\./g, '-')),
                        option: undefined,
                      };
                    }
                    return null;
                  }).filter(Boolean) as SelectedRangeItem[];
                  onRangeChange?.(ranges);
                }
              }}
            />
          )}
      </Dialog>
    </div>
  );
};
