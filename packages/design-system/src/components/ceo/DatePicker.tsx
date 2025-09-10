'use client';

import { useState, forwardRef, InputHTMLAttributes, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import { cn } from '../../utils';

type DatePickerProps = {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, value, onChange, className, ...props }, ref) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 내부 선택 상태 (value가 없으면 오늘로 초기화)
    const [selectedDate, setSelectedDate] = useState<Date>(value ?? today);
    const [month, setMonth] = useState(selectedDate.getMonth());
    const [year, setYear] = useState(selectedDate.getFullYear());

    useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setMonth(value.getMonth());
        setYear(value.getFullYear());
      }
    }, [value]);

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

    const daysInMonth = getDaysInMonth(year, month);

    const onSelectDate = (day: number) => {
      const selected = new Date(year, month, day);
      selected.setHours(0, 0, 0, 0);

      if (selected < today) return; // 오늘 이전 날짜 선택 불가

      setSelectedDate(selected);
      onChange?.(selected);
    };

    return (
      <div className={cn('relative flex flex-col', className)} {...props}>
        {label && (
          <label className='block mb-1 body-5 text-gray-5' htmlFor={props.id}>
            {label}
          </label>
        )}

        <input
          type='hidden'
          ref={ref}
          value={value ? value.toISOString().substring(0, 10) : ''}
          readOnly
          {...props}
        />

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
                  selectedDate.getFullYear() === year &&
                  selectedDate.getMonth() === month &&
                  selectedDate.getDate() === day;

                const isToday = dateObj.getTime() === today.getTime();

                const isSunday = dayOfWeek === 0;
                const isSaturday = dayOfWeek === 6;

                const isPast = dateObj < today;

                return (
                  <button
                    type='button'
                    key={day}
                    onClick={() => onSelectDate(day)}
                    disabled={isPast}
                    className={cn(
                      'rounded-full w-8 h-8 flex body-5 items-center justify-center transition-colors',
                      // 선택된 날짜일 때
                      isSelected
                        ? 'bg-fooding-purple text-white cursor-pointer'
                        : // 선택 안 됐고, 과거 날짜인 경우
                          isPast
                          ? 'text-gray-4 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-4'
                          : // 선택 안 됐고, 활성화된 날짜인 경우
                            'text-black cursor-pointer hover:bg-fooding-purple hover:text-white',
                      isSunday && !isSelected && !isPast && 'text-error-red',
                      isSaturday && !isSelected && !isPast && 'text-info-blue',
                      isToday && !isSelected && 'border border-fooding-purple',
                    )}
                    aria-current={isSelected ? 'date' : undefined}
                    aria-disabled={isPast}
                  >
                    {day}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
