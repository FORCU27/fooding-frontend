import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioSelectBox } from './RadioSelectBox';
import { useState } from 'react';
import z from 'zod/v4';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './Button';

const meta = {
  title: 'components/Ceo/RadioSelectBox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioSelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  {
    value: 'patron',
    label: '단골만',
    description: '우리 업체와 단골을 맺은 고객만 제공 받을 수 있어요',
  },
  {
    value: 'all',
    label: '누구나',
    description: '우리 업체에 방문하는 모든 고객이 제공받을 수 있어요',
  },
];

export const Default: Story = {
  render: () => {
    return (
      <div className='w-[640px]'>
        <RadioSelectBox defaultValue='patron'>
          {options.map((option) => (
            <RadioSelectBox.Option key={option.value} value={option.value}>
              <RadioSelectBox.Label>{option.label}</RadioSelectBox.Label>
              <RadioSelectBox.Description>{option.description}</RadioSelectBox.Description>
            </RadioSelectBox.Option>
          ))}
        </RadioSelectBox>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className='w-[640px]'>
        <RadioSelectBox disabled>
          {options.map((option) => (
            <RadioSelectBox.Option key={option.value} value={option.value}>
              <RadioSelectBox.Label>{option.label}</RadioSelectBox.Label>
              <RadioSelectBox.Description>{option.description}</RadioSelectBox.Description>
            </RadioSelectBox.Option>
          ))}
        </RadioSelectBox>
      </div>
    );
  },
};

export const OptionDisabled: Story = {
  render: () => {
    return (
      <div className='w-[640px]'>
        <RadioSelectBox>
          {options.map((option) => (
            <RadioSelectBox.Option
              key={option.value}
              value={option.value}
              disabled={option.value === 'all'}
            >
              <RadioSelectBox.Label>{option.label}</RadioSelectBox.Label>
              <RadioSelectBox.Description>{option.description}</RadioSelectBox.Description>
            </RadioSelectBox.Option>
          ))}
        </RadioSelectBox>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <div className='w-[640px]'>
        <RadioSelectBox orientation='vertical' defaultValue='patron'>
          {options.map((option) => (
            <RadioSelectBox.Option key={option.value} value={option.value}>
              <RadioSelectBox.Label>{option.label}</RadioSelectBox.Label>
              <RadioSelectBox.Description>{option.description}</RadioSelectBox.Description>
            </RadioSelectBox.Option>
          ))}
        </RadioSelectBox>
      </div>
    );
  },
};

export const Error: Story = {
  render: () => {
    return (
      <div className='w-[640px]'>
        <RadioSelectBox aria-invalid defaultValue='patron'>
          {options.map((option) => (
            <RadioSelectBox.Option key={option.value} value={option.value}>
              <RadioSelectBox.Label>{option.label}</RadioSelectBox.Label>
              <RadioSelectBox.Description>{option.description}</RadioSelectBox.Description>
            </RadioSelectBox.Option>
          ))}
        </RadioSelectBox>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('patron');

    return (
      <div className='w-[640px]'>
        <RadioSelectBox value={value} onChange={setValue}>
          {options.map((option) => (
            <RadioSelectBox.Option key={option.value} value={option.value}>
              <RadioSelectBox.Label>{option.label}</RadioSelectBox.Label>
              <RadioSelectBox.Description>{option.description}</RadioSelectBox.Description>
            </RadioSelectBox.Option>
          ))}
        </RadioSelectBox>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const Form = z.object({
      target: z.enum(options.map((option) => option.value)),
    });

    const form = useForm({
      resolver: zodResolver(Form),
      defaultValues: {
        target: '',
      },
    });

    const onSubmit = form.handleSubmit(() => {});

    return (
      <form onSubmit={onSubmit}>
        <Controller
          name='target'
          control={form.control}
          render={({ field }) => (
            <RadioSelectBox aria-invalid={!!form.formState.errors.target} {...field}>
              {options.map((option) => (
                <RadioSelectBox.Option key={option.value} value={option.value}>
                  <RadioSelectBox.Label>{option.label}</RadioSelectBox.Label>
                  <RadioSelectBox.Description>{option.description}</RadioSelectBox.Description>
                </RadioSelectBox.Option>
              ))}
            </RadioSelectBox>
          )}
        />
        <Button className='mt-4' type='submit'>
          제출하기
        </Button>
      </form>
    );
  },
};
