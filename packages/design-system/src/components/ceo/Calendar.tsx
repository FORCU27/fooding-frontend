'use client';

import { ko } from 'date-fns/locale/ko';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
  CalendarMonth,
  ChevronProps,
  CustomComponents,
  DayPicker,
  DayPickerProps,
  DayProps,
  useDayPicker,
} from 'react-day-picker';

import { cn } from '../../utils';

export type CalendarProps = DayPickerProps;

const Calendar = ({ className, ...props }: CalendarProps) => {
  return (
    <div
      className={cn(
        'py-5 px-8 rounded-[8px] shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)]',
        className,
      )}
    >
      <DayPicker
        classNames={classNames}
        locale={ko}
        components={components}
        captionLayout='label'
        labels={{
          labelPrevious: () => '이전 달',
          labelNext: () => '다음 달',
        }}
        {...props}
      />
    </div>
  );
};

const navButton =
  'absolute size-8 flex justify-center items-center rounded-full hover:bg-gray-7 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

const classNames = {
  months: 'flex relative',
  month: 'flex flex-col w-full',
  nav: 'flex justify-between items-center w-full h-[22px] p-1 absolute top-0 left-0 right-0',
  button_previous: cn(navButton, 'left-0'),
  button_next: cn(navButton, 'right-0'),
  month_grid: 'w-full border-collapse gap-2',
  weekdays: 'flex w-full gap-2 justify-center mt-[22px]',
  weekday:
    'first:text-error-red last:text-info-blue text-gray-5 body-5 m-0 box-border flex w-[30px] h-[20px] items-center justify-center p-0',
  weeks: 'pt-[22px] flex flex-col',
  week: 'flex w-full mt-2 gap-2 justify-center',
  day: 'body-5 relative rounded-full size-[30px] flex justify-center items-center p-0 text-center',
  day_button:
    'outline-hidden focus-visible:ring-2 focus-visible:ring-fooding-purple focus-visible:ring-offset-2 w-full h-full p-0 rounded-full disabled:pointer-events-none hover:bg-gray-7 cursor-pointer',
  hidden: 'opacity-0',
};

const Day = ({ children, day, className, ...props }: DayProps) => {
  const { getModifiers, isSelected, selected: selectedDates } = useDayPicker<{ mode: 'range' }>();

  const { disabled, hidden, outside } = getModifiers(day);

  const selected = isSelected?.(day.date);

  const isSunday = day.date.getDay() === 0;
  const isSaturday = day.date.getDay() === 6;

  const isRangeMiddle =
    selected &&
    selectedDates?.from &&
    selectedDates.from.toISOString() !== day.date.toISOString() &&
    selectedDates?.to &&
    selectedDates.to.toISOString() !== day.date.toISOString();

  if (hidden) {
    return <td className={className}>{day.date.getDate()}</td>;
  }

  return (
    <td
      className={cn(
        className,
        isSunday && 'text-error-red',
        isSaturday && 'text-info-blue',
        outside && 'text-gray-5',
        selected && 'bg-fooding-purple text-white hover:[&>button]:bg-fooding-purple',
        isRangeMiddle && 'bg-fooding-purple/15 hover:[&>button]:bg-fooding-purple/0 text-black',
        isRangeMiddle && isSunday && 'text-error-red',
        isRangeMiddle && isSaturday && 'text-info-blue',
        disabled && 'pointer-events-none text-gray-4',
      )}
      {...props}
    >
      {children}
    </td>
  );
};

const Chevron = ({ orientation }: ChevronProps) => {
  if (orientation === 'left') {
    return <ChevronLeftIcon className='size-5' strokeWidth={2.5} />;
  }

  return <ChevronRightIcon className='size-5' strokeWidth={2.5} />;
};

type MonthCaptionProps = {
  calendarMonth: CalendarMonth;
};

const MonthCaption = ({ calendarMonth }: MonthCaptionProps) => {
  return (
    <span className='mx-10 mb-2 flex items-center justify-center body-2 text-gray-6'>
      {calendarMonth.date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
      })}
    </span>
  );
};

const components: Partial<CustomComponents> = {
  Chevron,
  MonthCaption,
  Day,
};

export { Calendar };
