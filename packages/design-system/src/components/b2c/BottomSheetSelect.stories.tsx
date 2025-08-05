import type { StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BottomSheetSelect } from './BottomSheetSelect';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '.';

const meta = {
  title: 'components/b2c/BottomSheetSelect',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const GENDER = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
  { value: 'NONE', label: '선택안함' },
] as const;

type Gender = (typeof GENDER)[number]['value'];

export const Default: Story = {
  render: () => {
    const [selectedGender, setSelectedGender] = useState<Gender>('NONE');

    return (
      <div className='w-[400px]'>
        <BottomSheetSelect<Gender>
          label='성별'
          placeholder='성별을 선택해주세요.'
          options={GENDER}
          value={selectedGender}
          onChange={(value) => setSelectedGender(value as Gender)}
        />
      </div>
    );
  },
};

const formSchema = z.object({
  select: z.enum(['MALE', 'FEMALE', 'NONE']),
});

export const WithForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        select: 'NONE',
      },
    });

    return (
      <div className='w-[400px]'>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log('Form Submit', data);
          })}
        >
          <Controller
            name='select'
            control={form.control}
            render={({ field }) => (
              <BottomSheetSelect
                options={[...GENDER]}
                value={field.value}
                onChange={field.onChange}
                placeholder='성별을 선택해주세요.'
                label='성별'
              />
            )}
          />
          <Button type='submit' className='mt-4'>
            제출
          </Button>
        </form>
      </div>
    );
  },
};
