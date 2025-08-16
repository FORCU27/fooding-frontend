import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/ceo/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    inputType: {
      control: {
        type: 'select',
        options: ['search', 'url', 'text', undefined],
      },
    },
    suffix: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '기본 인풋',
  },
};

export const Search: Story = {
  args: {
    inputType: 'search',
    placeholder: '검색어를 입력하세요',
  },
};

export const URL: Story = {
  args: {
    inputType: 'url',
    placeholder: 'URL을 입력하세요',
  },
};

export const WithSuffix: Story = {
  args: {
    placeholder: '금액 입력',
    suffix: '원',
    defaultValue: '3000',
  },
};

export const TimeUnit: Story = {
  args: {
    placeholder: '시간 입력',
    suffix: '시간',
    defaultValue: '12',
  },
};

export const MinuteUnit: Story = {
  args: {
    placeholder: '분 입력',
    suffix: '분',
    defaultValue: '30',
  },
};

export const ParkingFeeExample: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <span className='text-sm w-20'>최초요금</span>
        <Input defaultValue='1' suffix='시간' className='w-24' />
        <Input defaultValue='60' suffix='분' className='w-24' />
        <Input defaultValue='3000' suffix='원' className='w-32' />
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm w-20'>추가요금</span>
        <Input defaultValue='0' suffix='시간' className='w-24' />
        <Input defaultValue='10' suffix='분' className='w-24' />
        <Input defaultValue='3000' suffix='원' className='w-32' />
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm w-20'>최대</span>
        <div className='flex-1'></div>
        <Input defaultValue='5000' suffix='원' className='w-32' />
      </div>
    </div>
  ),
};
