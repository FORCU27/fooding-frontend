'use client';

import { useState, forwardRef, InputHTMLAttributes, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import { cn } from '../../utils';

type DatePickerProps = {
  label?: string;
  mode?: 'single' | 'range';
  value?: Date | null;
  values?: Date[];
  startDate?: Date | null;
  endDate?: Date | null;
  selectionMode?: 'single' | 'multiple';
  onChange?: (date: Date | Date[] | null) => void;
  onRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, mode = 'single', value, values, startDate, endDate, selectionMode = 'single', onChange, onRangeChange, className, ...props }, ref) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 단일 선택 모드 상태
    const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);

    // 범위 선택 모드 상태
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(startDate ?? null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate ?? null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const [month, setMonth] = useState(
      mode === 'single'
        ? (selectedDate?.getMonth() ?? today.getMonth())
        : (startDate?.getMonth() ?? today.getMonth()),
    );
    const [year, setYear] = useState(
      mode === 'single'
        ? (selectedDate?.getFullYear() ?? today.getFullYear())
        : (startDate?.getFullYear() ?? today.getFullYear()),
    );

    useEffect(() => {
      if (mode === 'single' && value) {
        setSelectedDate(value);
        setMonth(value.getMonth());
        setYear(value.getFullYear());
      } else if (selectionMode === 'multiple' && values && values.length > 0) {
        setMonth(values[0]!.getMonth());
        setYear(values[0]!.getFullYear());
      } else if (mode === 'range') {
        if (startDate) {
          setSelectedStartDate(startDate);
          setMonth(startDate.getMonth());
          setYear(startDate.getFullYear());
        }
        if (endDate) {
          setSelectedEndDate(endDate);
        }
      }
    }, [value, values, mode, selectionMode, startDate, endDate]);

    const isDateInRange = (date: Date) => {
      if (mode !== 'range' || !selectedStartDate) return false;

      if (selectedEndDate) {
        return date >= selectedStartDate && date <= selectedEndDate;
      }

      if (hoverDate && selectedStartDate && !selectedEndDate) {
        const rangeStart = hoverDate < selectedStartDate ? hoverDate : selectedStartDate;
        const rangeEnd = hoverDate < selectedStartDate ? selectedStartDate : hoverDate;
        return date >= rangeStart && date <= rangeEnd;
      }

      return false;
    };

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

    const daysInMonth = getDaysInMonth(year, month);

    const onSelectDate = (day: number) => {
      const selected = new Date(year, month, day);
      selected.setHours(0, 0, 0, 0);

      if (selected < today) return;

      if (mode === 'single') {
        if (selectionMode === 'single') {
          setSelectedDate(selected);
          onChange?.(selected);
        } else if (selectionMode === 'multiple') {
          let newDates = values ?? [];
          const exists = newDates.some((d) => d.getTime() === selected.getTime());
          newDates = exists
            ? newDates.filter((d) => d.getTime() !== selected.getTime())
            : [...newDates, selected].sort((a, b) => a.getTime() - b.getTime());

          onChange?.(newDates);
        }
      } else {
        // 범위 선택 모드
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
          setSelectedStartDate(selected);
          setSelectedEndDate(null);
          onRangeChange?.(selected, null);
        } else {
          if (selected < selectedStartDate) {
            setSelectedStartDate(selected);
            setSelectedEndDate(selectedStartDate);
            onRangeChange?.(selected, selectedStartDate);
          } else {
            setSelectedEndDate(selected);
            onRangeChange?.(selectedStartDate, selected);
          }
        }
      }
    };

    return (
      <div className={cn('relative flex flex-col', className)} {...props}>
        {label && (
          <label className='block mb-1 body-5 text-gray-5' htmlFor={props.id}>
            {label}
          </label>
        )}

        {mode === 'single' && (
          <input
            type='hidden'
            ref={ref}
            value={value ? value.toISOString().substring(0, 10) : ''}
            readOnly
            {...props}
          />
        )}

        <div className='p-6 mt-1 rounded-lg border border-gray-1 bg-white w-full max-w-xs'>
          <div className='flex items-center justify-between mb-4'>
            <button
              type='button'
              aria-label='Previous month'
              onClick={() => {
                if (month === 0) {
                  setMonth(11);
                  setYear(year - 1);
                } else {
                  setMonth(month - 1);
                }
              }}
              className='p-1 hover:bg-gray-1 rounded-full'
            >
              <ChevronLeftIcon />
            </button>

            <div className='body-2'>
              {year}년 {month + 1}월
            </div>

            <button
              type='button'
              aria-label='Next month'
              onClick={() => {
                if (month === 11) {
                  setMonth(0);
                  setYear(year + 1);
                } else {
                  setMonth(month + 1);
                }
              }}
              className='p-1 hover:bg-gray-1 rounded-full'
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className='grid grid-cols-7 gap-2 text-center body-5 text-gray-5 mb-4 select-none'>
            {WEEK_DAYS.map((day, idx) => (
              <div
                key={day}
                className={cn(
                  'font-semibold',
                  idx === 0 ? 'text-error-red' : '',
                  idx === 6 ? 'text-info-blue' : '',
                )}
              >
                {day}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-7 gap-2'>
            {/* 빈 칸 */}
            {Array(new Date(year, month, 1).getDay())
              .fill(null)
              .map((_, i) => (
                <div key={'empty-' + i} />
              ))}

            {/* 날짜 버튼 */}
            {Array(daysInMonth)
              .fill(null)
              .map((_, i) => {
                const day = i + 1;
                const dateObj = new Date(year, month, day);
                dateObj.setHours(0, 0, 0, 0);
                const dayOfWeek = dateObj.getDay();

                const isSelected =
                  mode === 'single'
                    ? selectionMode === 'single'
                      ? selectedDate &&
                        selectedDate.getFullYear() === year &&
                        selectedDate.getMonth() === month &&
                        selectedDate.getDate() === day
                      : values?.some(
                          (d) =>
                            d.getFullYear() === year && d.getMonth() === month && d.getDate() === day,
                        )
                    : false;

                const isStartDate =
                  mode === 'range' &&
                  selectedStartDate &&
                  selectedStartDate.getFullYear() === year &&
                  selectedStartDate.getMonth() === month &&
                  selectedStartDate.getDate() === day;

                const isEndDate =
                  mode === 'range' &&
                  selectedEndDate &&
                  selectedEndDate.getFullYear() === year &&
                  selectedEndDate.getMonth() === month &&
                  selectedEndDate.getDate() === day;

                const isInRange = isDateInRange(dateObj);

                const isToday = dateObj.getTime() === today.getTime();
                const isSunday = dayOfWeek === 0;
                const isSaturday = dayOfWeek === 6;
                const isPast = dateObj < today;

                return (
                  <button
                    type='button'
                    key={day}
                    onClick={() => onSelectDate(day)}
                    onMouseEnter={() => mode === 'range' && setHoverDate(dateObj)}
                    onMouseLeave={() => mode === 'range' && setHoverDate(null)}
                    disabled={isPast}
                    className={cn(
                      'rounded-full w-8 h-8 flex body-5 items-center justify-center transition-colors relative',
                      // 선택된 날짜일 때 (단일 모드 또는 범위 모드의 시작/끝)
                      isSelected || isStartDate || isEndDate
                        ? 'bg-fooding-purple text-white cursor-pointer z-10'
                        : // 범위 내 날짜
                          isInRange
                          ? 'bg-fooding-purple/20 text-black cursor-pointer'
                          : // 과거 날짜
                            isPast
                            ? 'text-gray-4 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-4'
                            : // 활성화된 날짜
                              'text-black cursor-pointer hover:bg-fooding-purple hover:text-white',
                      isSunday && !isSelected && !isStartDate && !isEndDate && !isInRange && !isPast && 'text-error-red',
                      isSaturday && !isSelected && !isStartDate && !isEndDate && !isInRange && !isPast && 'text-info-blue',
                      isToday && !isSelected && !isStartDate && !isEndDate && 'border border-fooding-purple',
                    )}
                    aria-current={isSelected || isStartDate || isEndDate ? 'date' : undefined}
                    aria-disabled={isPast}
                  >
                    {day}
                  </button>
                );
              })}
          </div>

          {mode === 'range' && (selectedStartDate || selectedEndDate) && (
            <div className='mt-4 pt-4 border-t border-gray-1'>
              <div className='text-sm text-gray-6'>
                {selectedStartDate && !selectedEndDate && (
                  <span>시작일: {selectedStartDate.toLocaleDateString('ko-KR')}</span>
                )}
                {selectedStartDate && selectedEndDate && (
                  <span>
                    {selectedStartDate.toLocaleDateString('ko-KR')} ~{' '}
                    {selectedEndDate.toLocaleDateString('ko-KR')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
