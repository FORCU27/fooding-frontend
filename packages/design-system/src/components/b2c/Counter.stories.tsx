import type { StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';

import { Counter } from './Counter';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/Counter',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Counter />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div className='w-full flex flex-col gap-4 items-center'>
        <Counter value={value} onChange={setValue} />
        <div>현재 값: {value}</div>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const { control, handleSubmit } = useForm<{ counter: number }>({
      defaultValues: { counter: 2 },
    });

    const onSubmit = (data: { counter: number }) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4 items-center'>
        <Controller
          name='counter'
          control={control}
          render={({ field }) => <Counter value={field.value} onChange={field.onChange} />}
        />
        <button type='submit' className='px-4 py-2 rounded bg-blue-500 text-white'>
          제출
        </button>
      </form>
    );
  },
};
