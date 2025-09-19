import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarIcon, PhoneIcon, SearchIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { TextField } from './TextField';
import { Button } from './Button';

const meta = {
  title: 'components/Ceo/TextField',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <TextField>
        <TextField.Input />
      </TextField>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    return (
      <TextField>
        <TextField.Input placeholder='텍스트를 입력해주세요' />
      </TextField>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    return (
      <TextField label={<TextField.Label>레이블</TextField.Label>}>
        <TextField.Input />
      </TextField>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    return (
      <TextField defaultValue='읽기 전용'>
        <TextField.Input readOnly />
      </TextField>
    );
  },
};

export const WithPrefix: Story = {
  render: () => {
    return (
      <TextField>
        <TextField.Prefix>
          <SearchIcon className='text-gray-5' />
        </TextField.Prefix>
        <TextField.Input />
      </TextField>
    );
  },
};

export const WithSuffixIcon: Story = {
  render: () => {
    return (
      <TextField>
        <TextField.Input />
        <TextField.Suffix>
          <SearchIcon className='text-gray-5' />
        </TextField.Suffix>
      </TextField>
    );
  },
};

export const WithSuffixText: Story = {
  render: () => {
    return (
      <TextField>
        <TextField.Input />
        <TextField.Suffix className='text-gray-5 font-medium'>개</TextField.Suffix>
      </TextField>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <TextField
        value={value}
        onChange={setValue}
        label={<TextField.Label>텍스트</TextField.Label>}
      >
        <TextField.Input />
      </TextField>
    );
  },
};

export const ErrorMessage: Story = {
  render: () => {
    return (
      <TextField
        error
        errorMessage={<TextField.ErrorMessage>필수 입력 항목입니다.</TextField.ErrorMessage>}
      >
        <TextField.Input />
      </TextField>
    );
  },
};

export const Required: Story = {
  render: () => {
    return (
      <TextField label={<TextField.Label>레이블</TextField.Label>} required>
        <TextField.Input />
      </TextField>
    );
  },
};

export const WithMaxGraphemeCount: Story = {
  render: () => {
    return (
      <TextField maxGraphemeCount={100}>
        <TextField.Input />
      </TextField>
    );
  },
};

export const WithTextarea: Story = {
  render: () => {
    return (
      <TextField label={<TextField.Label>긴 텍스트</TextField.Label>} maxGraphemeCount={1000}>
        <TextField.Textarea className='min-h-[160px]' placeholder='텍스트를 입력해주세요' />
      </TextField>
    );
  },
};

export const TextAlignmentRight: Story = {
  render: () => {
    return (
      <TextField>
        <TextField.Input className='text-right pr-1' />
        <TextField.Suffix className='text-gray-5 font-medium'>원</TextField.Suffix>
      </TextField>
    );
  },
};

export const Format: Story = {
  render: () => {
    return (
      <div className='flex flex-col gap-2 w-full'>
        <TextField format='number'>
          <TextField.Input />
          <TextField.Suffix className='text-gray-5 font-medium'>%</TextField.Suffix>
        </TextField>
        <TextField format='currency'>
          <TextField.Input />
          <TextField.Suffix className='text-gray-5 font-medium'>원</TextField.Suffix>
        </TextField>
        <TextField format='phoneNumberDashed'>
          <TextField.Input />
          <TextField.Suffix className='text-gray-5 font-medium'>
            <PhoneIcon className='size-4' />
          </TextField.Suffix>
        </TextField>
        <TextField format='dateStringDashed'>
          <TextField.Input />
          <TextField.Suffix className='text-gray-5 font-medium'>
            <CalendarIcon className='size-4' />
          </TextField.Suffix>
        </TextField>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const InputForm = z.object({
      input: z.string().min(1, '필수 입력 항목입니다.'),
    });

    const form = useForm({
      resolver: zodResolver(InputForm),
      defaultValues: {
        input: '',
      },
    });

    const onSubmit = form.handleSubmit(() => {});

    return (
      <form className='w-full' onSubmit={onSubmit}>
        <Controller
          name='input'
          control={form.control}
          render={({ field }) => (
            <TextField
              label={<TextField.Label>텍스트</TextField.Label>}
              value={field.value}
              onChange={field.onChange}
              error={!!form.formState.errors.input}
              errorMessage={
                <TextField.ErrorMessage>
                  {form.formState.errors.input?.message}
                </TextField.ErrorMessage>
              }
              maxGraphemeCount={100}
              required
            >
              <TextField.Input ref={field.ref} placeholder='100자 이하의 텍스트' />
            </TextField>
          )}
        />
        <Button type='submit' className='mt-4'>
          제출하기
        </Button>
      </form>
    );
  },
};
