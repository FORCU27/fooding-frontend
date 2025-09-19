import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { Input } from './Input';
import { z } from 'zod/v4';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './Button';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { SelectBox } from './SelectBox';

const meta = {
  title: 'Components/ceo/Form',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  render: () => {
    return (
      <Form>
        <Form.Item label={<Form.Label>영업 시간</Form.Label>}>
          <Form.Control>
            <Input />
          </Form.Control>
        </Form.Item>
      </Form>
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    return (
      <Form>
        <Form.Item
          label={<Form.Label>영업 시간</Form.Label>}
          helperText={
            <Form.HelperText>
              임시 휴무일을 지정하시면 영업시간이 존재하더라도 휴무일로 표시됩니다
            </Form.HelperText>
          }
        >
          <Form.Control>
            <Input />
          </Form.Control>
        </Form.Item>
      </Form>
    );
  },
};

export const WithErrorMessage: Story = {
  render: () => {
    return (
      <Form>
        <Form.Item
          label={<Form.Label>영업 시간</Form.Label>}
          helperText={
            <Form.HelperText>
              임시 휴무일을 지정하시면 영업시간이 존재하더라도 휴무일로 표시됩니다
            </Form.HelperText>
          }
          error
        >
          <Form.Control>
            <Input />
          </Form.Control>
          <Form.ErrorMessage>필수 입력 항목입니다</Form.ErrorMessage>
        </Form.Item>
      </Form>
    );
  },
};

export const FullExample: Story = {
  render: () => {
    const formSchema = z.object({
      storeName: z.string().min(1, '업체명을 입력해주세요'),
      availablePaymentMethods: z
        .array(z.string())
        .min(1, { message: '결제 수단을 하나 이상 선택해주세요' }),
      businessCategory: z.string().min(1, '업종을 선택해주세요'),
      parkingStatus: z.enum(['available', 'unavailable'], {
        error: '주차 가능 여부를 선택해주세요',
      }),
    });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        storeName: '',
        availablePaymentMethods: [],
        businessCategory: '',
        parkingStatus: undefined,
      },
    });

    const onSubmit = form.handleSubmit(() => {});

    return (
      <Form className='w-[800px] space-y-10' onSubmit={onSubmit}>
        <Form.Item
          label={<Form.Label>업체명</Form.Label>}
          error={!!form.formState.errors.storeName}
        >
          <Controller
            name='storeName'
            control={form.control}
            render={({ field }) => (
              <Form.Control>
                <Input {...field} placeholder='업체명을 입력해주세요' />
              </Form.Control>
            )}
          />
          <Form.ErrorMessage>{form.formState.errors.storeName?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item
          label={<Form.Label required>업종</Form.Label>}
          error={!!form.formState.errors.businessCategory}
        >
          <Controller
            name='businessCategory'
            control={form.control}
            render={({ field }) => (
              <Form.Control>
                <SelectBox
                  options={BUSINESS_CATEGORIES}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </Form.Control>
            )}
          />
          <Form.ErrorMessage>{form.formState.errors.businessCategory?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item
          label={<Form.Label>결제 수단</Form.Label>}
          error={!!form.formState.errors.availablePaymentMethods}
          helperText={
            <Form.HelperText>
              네이버페이, 카카오페이, 페이코, 애플페이 등 QR코드결제 또는 바코드 결제가 가능한 경우
              간편결제를 선택해주세요
            </Form.HelperText>
          }
        >
          <Controller
            name='availablePaymentMethods'
            control={form.control}
            render={({ field }) => (
              <Form.Control>
                <ToggleGroup type='multiple' value={field.value} onValueChange={field.onChange}>
                  {AVAILABLE_PAYMENT_METHODS.map((method) => (
                    <ToggleGroupItem key={method.value} value={method.value}>
                      {method.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Form.Control>
            )}
          />
          <Form.ErrorMessage>
            {form.formState.errors.availablePaymentMethods?.message}
          </Form.ErrorMessage>
        </Form.Item>
        <Form.Item
          label={<Form.Label>주차 가능한가요?</Form.Label>}
          error={!!form.formState.errors.parkingStatus}
        >
          <Controller
            name='parkingStatus'
            control={form.control}
            render={({ field }) => (
              <Form.Control>
                <ToggleGroup
                  className='gap-5'
                  type='single'
                  value={field.value}
                  onValueChange={field.onChange}
                  fullWidth
                >
                  <ToggleGroupItem value='available'>가능해요</ToggleGroupItem>
                  <ToggleGroupItem value='unavailable'>불가능해요</ToggleGroupItem>
                </ToggleGroup>
              </Form.Control>
            )}
          />
          <Form.ErrorMessage>{form.formState.errors.parkingStatus?.message}</Form.ErrorMessage>
        </Form.Item>
        <Button type='submit'>저장</Button>
      </Form>
    );
  },
};

const AVAILABLE_PAYMENT_METHODS = [
  { label: '지역화폐(지류형)', value: 'localCurrencyPaper' },
  { label: '지역화폐(카드형)', value: 'localCurrencyCard' },
  { label: '지역화폐(모바일형)', value: 'localCurrencyMobile' },
  { label: '제로페이', value: 'zeropay' },
  { label: '간편결제', value: 'easyPayment' },
];

const BUSINESS_CATEGORIES = [
  { label: '한식', value: 'korean' },
  { label: '중식', value: 'chinese' },
  { label: '일식', value: 'japanese' },
];
