import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerWithDialog, SelectedItem } from './DatePickerWithDialog';
import { useState } from 'react';

const meta: Meta<typeof DatePickerWithDialog> = {
  title: 'Components/ceo/DatePicker/DatePickerWithDialog',
  component: DatePickerWithDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    placeholder: { control: 'text' },
    selectionMode: { control: 'radio', options: ['single', 'multiple'] },
    hasCloseBtn: { control: 'boolean' },
    hasRadioButtonGroup: { control: 'boolean' },
    radioOptions: { control: 'object' },
    selectedDates: {
      control: 'object',
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerWithDialog>;

export const Default: Story = {
  args: {
    title: 'title',
    placeholder: 'placeholder',
    selectionMode: 'single',
    hasRadioButtonGroup: true,
    radioOptions: [
      { label: '한번만', value: 'option1' },
      { label: '매달', value: 'option2' },
      { label: '매년', value: 'option3' },
    ],
  },
  render: ({ ...args }) => (
    <div className='w-[640px] h-full'>
      <DatePickerWithDialog {...args} />
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    title: 'title',
    placeholder: 'placeholder',
    selectionMode: 'multiple',
  },
  render: ({ ...args }) => (
    <div className='w-[640px] h-full'>
      <DatePickerWithDialog {...args} />
    </div>
  ),
};

export const WithRadioButtonGroup: Story = {
  args: {
    title: 'title',
    placeholder: 'placeholder',
    selectionMode: 'single',
    hasCloseBtn: false,
    hasRadioButtonGroup: true,
    radioOptions: [
      { label: '옵션 1', value: 'option1' },
      { label: '옵션 2', value: 'option2' },
      { label: '옵션 3', value: 'option3' },
    ],
  },
  render: ({ ...args }) => (
    <div className='w-[640px] h-full'>
      <DatePickerWithDialog {...args} />
    </div>
  ),
};

export const WithRadioButtonGroupMulti: Story = {
  args: {
    title: 'title',
    placeholder: 'placeholder',
    selectionMode: 'multiple',
    hasCloseBtn: true,
    hasRadioButtonGroup: true,
    radioOptions: [
      { label: '옵션 1', value: 'option1' },
      { label: '옵션 2', value: 'option2' },
      { label: '옵션 3', value: 'option3' },
    ],
  },
  render: ({ ...args }) => (
    <div className='w-[640px] h-full'>
      <DatePickerWithDialog {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    title: '휴무일',
    placeholder: '휴무일을 선택해주세요',
    selectionMode: 'multiple',
    hasRadioButtonGroup: true,
    radioOptions: [
      { label: '한번만', value: 'once' },
      { label: '매달', value: 'monthly' },
      { label: '매년', value: 'annually' },
    ],
  },
  render: ({ ...args }) => {
    const [selectedDates, setSelectedDates] = useState<SelectedItem[] | SelectedItem | null>(
      args.selectionMode === 'single' ? null : [],
    );

    return (
      <div className='w-[640px] h-full flex flex-col gap-4'>
        <p className='mt-2'>
          선택한 날짜:
          {args.selectionMode === 'single'
            ? selectedDates
              ? (selectedDates as SelectedItem).option
                ? `${(selectedDates as SelectedItem).option} ${(selectedDates as SelectedItem).date.toLocaleDateString('ko-KR')}`
                : (selectedDates as SelectedItem).date.toLocaleDateString('ko-KR')
              : '없음'
            : Array.isArray(selectedDates) && selectedDates.length > 0
              ? selectedDates
                  .map((d) =>
                    d.option
                      ? `${d.option} ${d.date.toLocaleDateString('ko-KR')}`
                      : d.date.toLocaleDateString('ko-KR'),
                  )
                  .join(', ')
              : '없음'}
        </p>
        <DatePickerWithDialog {...args} selectedDates={selectedDates} onChange={setSelectedDates} />
      </div>
    );
  },
};
