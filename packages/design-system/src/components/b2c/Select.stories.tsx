import type { StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Select } from './Select';
import { useState } from 'react';
import { Button } from '.';

const meta = {
  title: 'components/b2c/Select',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Select className='w-[400px]' placeholder='성별을 선택해주세요.'>
        <Select.Option value='1'>남성</Select.Option>
        <Select.Option value='2'>여성</Select.Option>
        <Select.Option value='3'>선택안함</Select.Option>
      </Select>
    );
  },
};

type Gender = (typeof GENDER)[number];
const GENDER = ['남성', '여성', '선택안함'] as const;

export const WithLiterals: Story = {
  render: () => {
    const [selectedGender, setSelectedGender] = useState<Gender>(GENDER[0]);

    return (
      <Select value={selectedGender} onChange={setSelectedGender}>
        {GENDER.map((gender) => (
          <Select.Option key={gender} value={gender}>
            {gender}
          </Select.Option>
        ))}
      </Select>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Select className='w-[400px]' placeholder='성별을 선택해주세요.' disabled>
        <Select.Option value='1'>남성</Select.Option>
        <Select.Option value='2'>여성</Select.Option>
        <Select.Option value='3'>선택안함</Select.Option>
      </Select>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <Select className='w-[400px]' placeholder='성별을 선택해주세요.' aria-invalid>
        <Select.Option value='1'>남성</Select.Option>
        <Select.Option value='2'>여성</Select.Option>
        <Select.Option value='3'>선택안함</Select.Option>
      </Select>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('');

    return (
      <Select
        className='w-[400px]'
        placeholder='성별을 선택해주세요.'
        value={selectedValue}
        onChange={setSelectedValue}
      >
        <Select.Option value='1'>남성</Select.Option>
        <Select.Option value='2'>여성</Select.Option>
        <Select.Option value='3'>선택안함</Select.Option>
      </Select>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const formSchema = z.object({
      select: z.enum(GENDER),
    });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        select: GENDER[0],
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
              <Select {...field} label='성별'>
                {GENDER.map((genderOption) => (
                  <Select.Option key={genderOption} value={genderOption}>
                    {genderOption}
                  </Select.Option>
                ))}
              </Select>
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
