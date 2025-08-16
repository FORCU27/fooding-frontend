import type { Meta, StoryObj } from '@storybook/react';
import { DatePickerWithDialog } from './DatePickerWithDialog';

const meta: Meta<typeof DatePickerWithDialog> = {
  title: 'Components/ceo/DatePicker/DatePickerWithDialog',
  component: DatePickerWithDialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerWithDialog>;

export const Default: Story = {
  render: () => (
    <div className='w-[640px] h-full'>
      <DatePickerWithDialog
        title='휴무일'
        placeHolder='휴무일을 선택해주세요'
        selectionMode='single'
      />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className='w-[640px] h-full'>
      <DatePickerWithDialog
        title='휴무일'
        placeHolder='휴무일을 선택해주세요'
        selectionMode='multiple'
      />
    </div>
  ),
};

export const WithRadioButtonGroup: Story = {
  render: () => (
    <div className='w-[640px] h-full'>
      <DatePickerWithDialog
        title='휴무일'
        placeHolder='휴무일을 선택해주세요'
        selectionMode='single'
        hasCloseBtn={false}
        hasRadioButtonGroup
        radioOptions={[
          { label: '옵션 1', value: 'option1' },
          { label: '옵션 2', value: 'option2' },
          { label: '옵션 3', value: 'option3' },
        ]}
      />
    </div>
  ),
};
