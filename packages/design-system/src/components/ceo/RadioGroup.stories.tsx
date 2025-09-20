import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Form } from './Form';
import { Button } from './Button';

const meta = {
  title: 'components/Ceo/RadioGroup',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <RadioGroup>
        <RadioGroup.Option value='1'>선택 1</RadioGroup.Option>
        <RadioGroup.Option value='2'>선택 2</RadioGroup.Option>
      </RadioGroup>
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    return (
      <RadioGroup defaultValue='1'>
        <RadioGroup.Option value='1'>선택 1</RadioGroup.Option>
        <RadioGroup.Option value='2'>선택 2</RadioGroup.Option>
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <RadioGroup disabled>
        <RadioGroup.Option value='1'>선택 1</RadioGroup.Option>
        <RadioGroup.Option value='2'>선택 2</RadioGroup.Option>
      </RadioGroup>
    );
  },
};

export const OptionDisabled: Story = {
  render: () => {
    return (
      <RadioGroup>
        <RadioGroup.Option value='1' disabled>
          선택 1
        </RadioGroup.Option>
        <RadioGroup.Option value='2'>선택 2</RadioGroup.Option>
      </RadioGroup>
    );
  },
};

export const Error: Story = {
  render: () => {
    return (
      <RadioGroup aria-invalid>
        <RadioGroup.Option value='1'>선택 1</RadioGroup.Option>
        <RadioGroup.Option value='2'>선택 2</RadioGroup.Option>
      </RadioGroup>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <RadioGroup orientation='vertical'>
        <RadioGroup.Option value='1'>선택 1</RadioGroup.Option>
        <RadioGroup.Option value='2'>선택 2</RadioGroup.Option>
      </RadioGroup>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('1');

    return (
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Option value='1'>선택 1</RadioGroup.Option>
        <RadioGroup.Option value='2'>선택 2</RadioGroup.Option>
      </RadioGroup>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const BUSINESS_HOURS = ['everday', 'different', 'fulltime'] as const;
    const BUSINESS_HOUR_LABEL: Record<(typeof BUSINESS_HOURS)[number], string> = {
      everday: '매일 같아요',
      different: '요일마다 달라요',
      fulltime: '24시간 영업',
    };

    const formSchema = z.object({
      businessHour: z.enum(BUSINESS_HOURS, '영업 시간을 선택해주세요'),
    });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        businessHour: undefined,
      },
    });

    const onSubmit = form.handleSubmit(() => {});

    return (
      <Form onSubmit={onSubmit}>
        <Form.Item error={!!form.formState.errors.businessHour}>
          <Form.Label>영업 시간을 알려주세요</Form.Label>
          <Controller
            name='businessHour'
            control={form.control}
            render={({ field }) => (
              <Form.Control>
                <RadioGroup {...field}>
                  {BUSINESS_HOURS.map((businessHour) => (
                    <RadioGroup.Option key={businessHour} value={businessHour}>
                      {BUSINESS_HOUR_LABEL[businessHour]}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
              </Form.Control>
            )}
          />
          <Form.ErrorMessage>{form.formState.errors.businessHour?.message}</Form.ErrorMessage>
        </Form.Item>
        <Button className='mt-8' type='submit'>
          제출하기
        </Button>
      </Form>
    );
  },
};
