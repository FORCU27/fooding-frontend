/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

import { CreateStorePointShopItemBody } from '@repo/api/ceo';
import { toast } from '@repo/design-system/components/b2c';
import {
  Button,
  Form,
  ToolTip,
  Input,
  ToggleGroup,
  ToggleGroupItem,
  RadioButton,
  TextArea,
  CoinProduct,
  ImageUploader,
  DatePickerWithDialog,
} from '@repo/design-system/components/ceo';
import { Controller, useForm } from 'react-hook-form';

interface PointShopFormProps {
  originValue?: CreateStorePointShopItemBody & {
    image?: { id: string; name: string; url: string; size: number };
    dateRange?: Date[] | null;
  };
  onSubmit: (
    data: CreateStorePointShopItemBody & {
      file?: File | null;
      image?: { id: string; name: string; url: string; size: number };
      dateRange?: Date[] | null;
    },
  ) => void;
}

const PointShopForm = ({ originValue, onSubmit }: PointShopFormProps) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(originValue?.image?.url || '');
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateStorePointShopItemBody & { quantityLimit: boolean; dateRange?: Date[] | null }>(
    {
      mode: 'onSubmit',
      defaultValues: {
        name: originValue?.name || '',
        point: originValue?.point || 0,
        provideType: originValue?.provideType || 'ALL',
        conditions: originValue?.conditions || '',
        totalQuantity: originValue?.totalQuantity || 0,
        quantityLimit: originValue ? originValue.totalQuantity > 0 : false,
        imageId: originValue?.image?.id || '',
        dateRange:
          originValue?.issueStartOn && originValue?.issueEndOn
            ? [new Date(originValue.issueStartOn), new Date(originValue.issueEndOn)]
            : null,
        issueStartOn: originValue?.issueStartOn ?? null,
        issueEndOn: originValue?.issueEndOn ?? null,
      },
    },
  );

  const dataURLtoFile = (dataurl: string, filename = 'upload.png') => {
    const arr = dataurl.split(',');
    const mime = arr[0]?.match(/:(.*?);/)![1];
    const bstr = atob(arr[1]!);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleImageChange = async (
    images: string[],
    field: { onChange: (value: string) => void },
  ) => {
    if (images.length === 0) {
      setImageFile(null);
      setPreviewImage('');
      field.onChange('');
      return;
    }

    const file = dataURLtoFile(images[0]!);
    setImageFile(file);
    setPreviewImage(images[0]!);
    field.onChange(images[0]!);
  };

  const handleFormSubmit = async (
    data: CreateStorePointShopItemBody & { quantityLimit: boolean; dateRange?: Date[] | null },
  ) => {
    try {
      setLoading(true);
      onSubmit({ ...data, file: imageFile });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || '처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const quantityLimit = watch('quantityLimit');
  const totalQuantity = Number(watch('totalQuantity') ?? 0);
  const point = Number(watch('point') ?? 0);
  const name = watch('name') ?? '';
  const conditions = watch('conditions') ?? '';
  const issueStartOn = watch('issueStartOn');
  const issueEndOn = watch('issueEndOn');

  const dateRange = watch('dateRange');

  useEffect(() => {
    if (dateRange && dateRange.length === 2) {
      setValue('issueStartOn', dateRange[0]?.toISOString().split('T')[0] || null);
      setValue('issueEndOn', dateRange[1]?.toISOString().split('T')[0] || null);
    } else {
      setValue('issueStartOn', null);
      setValue('issueEndOn', null);
    }
  }, [dateRange, setValue]);

  return (
    <div>
      <Form
        className='flex flex-col h-full w-full max-w-[1100px] gap-6 pb-8'
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h1 className='headline-2 mb-4 ml-10'>포인트샵 상품 {originValue ? '수정' : '등록'}</h1>

        <Form.Item
          label={<Form.Label>상품이름</Form.Label>}
          error={!!errors.name}
          className='bg-white rounded-2xl p-8 border border-gray-3'
        >
          <Form.Control>
            <Input type='text' {...register('name', { required: '상품명을 입력해주세요.' })} />
          </Form.Control>
          <Form.ErrorMessage>{errors.name?.message}</Form.ErrorMessage>
        </Form.Item>

        <Form.Item
          label={<Form.Label>포인트</Form.Label>}
          error={!!errors.point}
          className='bg-white rounded-2xl p-8 border border-gray-3'
        >
          <Form.Control>
            <Input
              suffix='P'
              type='number'
              {...register('point', {
                required: '포인트를 입력해주세요.',
                min: { value: 0, message: '포인트는 0 이상이어야 합니다.' },
              })}
            />
          </Form.Control>
          <Form.ErrorMessage>{errors.point?.message}</Form.ErrorMessage>
        </Form.Item>

        <Form.Item
          label={<Form.Label>제공 대상</Form.Label>}
          error={!!errors.provideType}
          className='bg-white rounded-2xl p-8 border border-gray-3'
        >
          <Controller
            name='provideType'
            control={control}
            render={({ field }) => (
              <ToggleGroup
                type='single'
                value={field.value}
                onValueChange={(val: 'ALL' | 'REGULAR_CUSTOMER') => field.onChange(val)}
              >
                <div className='flex justify-between gap-3 w-full'>
                  <ToggleGroupItem
                    value='REGULAR_CUSTOMER'
                    className='flex flex-col w-full h-fit items-baseline py-4'
                  >
                    <div className='flex flex-col gap-2 text-left'>
                      <p>단골만</p>
                      <p className='text-gray-5 body-2'>
                        우리 업체와 단골을 맺은 고객만 제공 받을 수 있어요
                      </p>
                    </div>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value='ALL'
                    className='flex flex-col w-full h-fit items-baseline py-4'
                  >
                    <div className='flex flex-col gap-2 text-left '>
                      <p className='justify-baseline'>누구나</p>
                      <p className='text-gray-5 body-2'>
                        우리 업체에 방문하는 모든 고객이 제공받을 수 있어요
                      </p>
                    </div>
                  </ToggleGroupItem>
                </div>
              </ToggleGroup>
            )}
          />
          <Form.ErrorMessage>{errors.provideType?.message}</Form.ErrorMessage>
        </Form.Item>

        <Form.Item
          label={
            <Form.Label>
              <p>발급 개수</p>
              <ToolTip>사용기한 내애 쿠폰을 개수 제한 없이 받을 수 있어요</ToolTip>
            </Form.Label>
          }
          className='bg-white rounded-2xl p-8 border border-gray-3'
        >
          <Form.Control>
            <Controller
              name='quantityLimit'
              control={control}
              render={({ field }) => (
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-4'>
                    <RadioButton
                      label='제한있어요'
                      value='true'
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                    />
                    <RadioButton
                      label='제한없어요'
                      value='false'
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                    />
                  </div>

                  {field.value === true && (
                    <Form.Item className='mt-2'>
                      <Form.Control>
                        <Input
                          suffix='개'
                          type='number'
                          {...register('totalQuantity', {
                            setValueAs: (v) => (v === '' || v === null ? 0 : Number(v)),
                            min: { value: 0, message: '0 이상이어야 합니다.' },
                          })}
                          placeholder='발급 수량을 입력해주세요'
                        />
                      </Form.Control>
                      <Form.ErrorMessage>{errors.totalQuantity?.message}</Form.ErrorMessage>
                    </Form.Item>
                  )}
                </div>
              )}
            />
          </Form.Control>
        </Form.Item>

        <Form.Item
          label={<Form.Label>사용기한</Form.Label>}
          error={!!errors.conditions}
          className='bg-white rounded-2xl p-8 border border-gray-3'
        >
          <Form.Control>
            <Controller
              name='dateRange'
              control={control}
              render={({ field }) => {
                const startDate = field.value?.[0] ?? null;
                const endDate = field.value?.[1] ?? null;

                return (
                  <DatePickerWithDialog
                    datePickerMode='range'
                    selectedRanges={startDate && endDate ? [{ startDate, endDate }] : []}
                    onRangeChange={(ranges) => {
                      let updatedDates: Date[] | null = null;

                      if (ranges) {
                        if (Array.isArray(ranges) && ranges.length > 0) {
                          const first = ranges[0];
                          if (first?.startDate && first?.endDate) {
                            updatedDates = [first.startDate, first.endDate];
                          }
                        } else if ('startDate' in ranges && 'endDate' in ranges) {
                          updatedDates = [ranges.startDate, ranges.endDate];
                        }
                      }

                      field.onChange(updatedDates);

                      setValue(
                        'issueStartOn',
                        updatedDates?.[0]?.toISOString().split('T')[0] ?? null,
                      );
                      setValue(
                        'issueEndOn',
                        updatedDates?.[1]?.toISOString().split('T')[0] ?? null,
                      );
                    }}
                    placeholder={
                      startDate && endDate
                        ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
                        : '날짜를 선택해주세요'
                    }
                  />
                );
              }}
            />
          </Form.Control>
          <Form.ErrorMessage>{errors.conditions?.message}</Form.ErrorMessage>
        </Form.Item>

        <Form.Item
          label={<Form.Label>사용조건</Form.Label>}
          error={!!errors.conditions}
          className='bg-white rounded-2xl p-8 border border-gray-3'
        >
          <Form.Control>
            <Controller
              name='conditions'
              control={control}
              render={({ field }) => (
                <TextArea {...field} maxLength={1000} className='min-h-[200px]' />
              )}
            />
          </Form.Control>
          <Form.ErrorMessage>{errors.conditions?.message}</Form.ErrorMessage>
        </Form.Item>
        <Form.Item
          label={<Form.Label>사진</Form.Label>}
          error={!!errors.conditions}
          className='bg-white rounded-2xl p-8 border border-gray-3'
        >
          <Controller
            name='imageId'
            control={control}
            render={({ field }) => (
              <ImageUploader
                maxImages={1}
                images={previewImage ? [previewImage] : []}
                onChange={(images) => handleImageChange(images, field)}
              />
            )}
          />
        </Form.Item>

        <div className='w-full flex justify-center'>
          <Button type='submit' disabled={loading} className='w-fit'>
            {loading
              ? originValue
                ? '수정중...'
                : '등록중...'
              : originValue
                ? '수정하기'
                : '등록하기'}
          </Button>
        </div>
      </Form>

      <div className='flex flex-col gap-2 my-10'>
        <h1 className='headline-2 ml-10'>미리보기</h1>
        <CoinProduct
          canceledCount={quantityLimit ? totalQuantity : 0}
          exchangePoint={point}
          imageAlt={name}
          purchaseCount={0}
          receivedCount={quantityLimit ? totalQuantity : 0}
          dateRange={issueStartOn && issueEndOn ? `${issueStartOn} ~ ${issueEndOn}` : undefined}
          registrationDate='2025.00.00'
          status='발급중'
          title={name || '쿠폰이름'}
          usedCount={0}
          conditions={conditions}
          image={previewImage}
        />
      </div>
    </div>
  );
};

export default PointShopForm;
