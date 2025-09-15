'use client';

import { useState, forwardRef, InputHTMLAttributes, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import { cn } from '../../utils';

type DatePickerProps = {
  label?: string;
  mode?: 'single' | 'range';
  value?: Date | null;
  values?: Date[];
  selectionMode?: 'single' | 'multiple';
  onChange?: (date: Date | Date[] | null) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, value, values, selectionMode = 'single', onChange, className, ...props }, ref) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 단일 선택 모드 상태
    const [selectedDate, setSelectedDate] = useState<Date>(value ?? today);

    // 범위 선택 모드 상태
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(startDate ?? null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endDate ?? null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const [month, setMonth] = useState(
      mode === 'single' ? selectedDate.getMonth() : (startDate?.getMonth() ?? today.getMonth()),
    );
    const [year, setYear] = useState(
      mode === 'single'
        ? selectedDate.getFullYear()
        : (startDate?.getFullYear() ?? today.getFullYear()),
    );

    useEffect(() => {
      if (selectionMode === 'single' && value) {
        setSelectedDate(value);
        setMonth(value.getMonth());
        setYear(value.getFullYear());
      } else if (selectionMode === 'multiple' && values && values.length > 0) {
        setMonth(values[0]!.getMonth());
        setYear(values[0]!.getFullYear());
      }
    }, [value, values, selectionMode]);

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

    const daysInMonth = getDaysInMonth(year, month);

    const onSelectDate = (day: number) => {
      const selected = new Date(year, month, day);
      selected.setHours(0, 0, 0, 0);

      if (selected < today) return;

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
    };

    return (
      <div className={cn('relative flex flex-col', className)} {...props}>
        {label && (
          <label className='block mb-1 body-5 text-gray-5' htmlFor={props.id}>
            {label}
          </label>
        )}

        {selectionMode === 'single' && (
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
                  selectionMode === 'single'
                    ? selectedDate.getFullYear() === year &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getDate() === day
                    : values?.some(
                        (d) =>
                          d.getFullYear() === year && d.getMonth() === month && d.getDate() === day,
                      );

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
                      'rounded-full w-8 h-8 flex body-5 items-center justify-center transition-colors',
                      isSelected
                        ? 'bg-fooding-purple text-white cursor-pointer'
                        : isPast
                          ? 'text-gray-4 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-4'
                          : 'text-black cursor-pointer hover:bg-fooding-purple hover:text-white',
                      isSunday && !isSelected && !isPast && 'text-error-red',
                      isSaturday && !isSelected && !isPast && 'text-info-blue',
                      isToday && !isSelected && 'border border-fooding-purple',
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
