'use client';

import { useState, useEffect } from 'react';

import {
  Button,
  Card,
  CardForm,
  CardSubtitle,
  Coupon,
  DatePickerWithDialog,
  Input,
  RadioButton,
  TextArea,
  ToggleGroup,
  ToggleGroupItem,
  type SelectedRangeItem,
} from '@repo/design-system/components/ceo';

export interface CouponFormData {
  couponName?: string; // gift 모드에서는 선택적
  benefitType: string;
  discountType: string;
  discountPercentage: string;
  discountAmount: string;
  giftItem: string;
  giftType: string;
  minOrderAmount: string;
  couponUsageType: string;
  issueType: string;
  issueCount: string;
  startDate: string;
  endDate: string;
  usageConditions: string;
}

interface CouponFormProps {
  title: string;
  mode?: 'create' | 'edit' | 'gift';
  initialData?: Partial<CouponFormData>;
  initialDateRange?: SelectedRangeItem | null;
  onSubmit: (data: CouponFormData, dateRange: SelectedRangeItem | null) => Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  isSubmitting?: boolean;
  previewCouponName?: string; // gift 모드용 미리보기 쿠폰 이름
}

export const CouponForm = ({
  title,
  mode = 'create',
  initialData,
  initialDateRange,
  onSubmit,
  onCancel,
  submitText = '생성하기',
  isSubmitting = false,
  previewCouponName,
}: CouponFormProps) => {
  const [formData, setFormData] = useState<CouponFormData>({
    couponName: '',
    benefitType: 'discount',
    discountType: 'fixed',
    discountPercentage: '',
    discountAmount: '',
    giftItem: '',
    giftType: 'threshold',
    minOrderAmount: '',
    couponUsageType: 'all',
    issueType: 'unlimited',
    issueCount: '',
    startDate: '',
    endDate: '',
    usageConditions: '',
    ...initialData,
  });

  const [selectedDateRange, setSelectedDateRange] = useState<SelectedRangeItem | null>(
    initialDateRange || null,
  );

  // 초기 데이터가 변경되면 폼 업데이트
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]); // initialData가 변경될 때마다 실행

  useEffect(() => {
    if (initialDateRange) {
      setSelectedDateRange(initialDateRange);
    }
  }, [initialDateRange]); // initialDateRange가 변경될 때마다 실행

  const handleBenefitTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      benefitType: value,
      discountType: value === 'discount' ? 'fixed' : prev.discountType,
      discountPercentage: '',
      discountAmount: '',
      giftItem: '',
      giftType: 'threshold',
      minOrderAmount: value === 'gift' ? prev.minOrderAmount : '',
    }));
  };

  const handleSubmit = async () => {
    // gift 모드가 아닐 때만 쿠폰 이름 체크
    if (mode !== 'gift' && !formData.couponName) {
      alert('쿠폰 이름을 입력해주세요.');
      return;
    }

    if (formData.benefitType === 'discount') {
      if (!formData.discountPercentage && !formData.discountAmount) {
        alert('할인율 또는 할인 금액을 입력해주세요.');
        return;
      }
    } else if (formData.benefitType === 'gift') {
      if (formData.giftType === 'threshold' && !formData.minOrderAmount) {
        alert('증정 조건 금액을 입력해주세요.');
        return;
      }
    }

    if (!selectedDateRange || !selectedDateRange.startDate || !selectedDateRange.endDate) {
      alert('사용 기간을 선택해주세요.');
      return;
    }

    await onSubmit(formData, selectedDateRange);
  };

  return (
    <CardForm className=''>
      <div className='headline-2'>{title}</div>

      <Card>
        <CardSubtitle label='혜택 선택' required>
          <ToggleGroup
            type='single'
            value={formData.benefitType}
            onValueChange={handleBenefitTypeChange}
            className='grid grid-cols-2 gap-4'
          >
            <ToggleGroupItem value='discount' className='flex-col items-start p-6 h-auto'>
              <div className='text-lg font-medium mb-2'>할인</div>
              <div className='text-sm text-gray-500'>
                할인되는 쿠폰을 설정해 고객의 구매 부담을 줄여보세요
              </div>
            </ToggleGroupItem>
            <ToggleGroupItem value='gift' className='flex-col items-start p-6 h-auto'>
              <div className='text-lg font-medium mb-2'>증정</div>
              <div className='text-sm text-gray-500'>
                정해진 조건에 따른 쿠폰으로 단골 고객을 만들어보세요
              </div>
            </ToggleGroupItem>
          </ToggleGroup>

          {formData.benefitType === 'discount' && (
            <div className='mt-4 p-2 w-[50%]'>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='min-w-[100px]'>
                    <RadioButton
                      label='금액'
                      value='fixed'
                      checked={formData.discountType === 'fixed'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: 'fixed',
                          discountPercentage: '',
                        }))
                      }
                    />
                  </div>
                  <Input
                    type='text'
                    value={formData.discountAmount || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        discountAmount: e.target.value,
                        discountType: 'fixed',
                        discountPercentage: '',
                      }))
                    }
                    placeholder=''
                    suffix='원'
                    disabled={formData.discountType === 'percentage'}
                  />
                </div>

                <div className='flex items-center gap-4'>
                  <div className='min-w-[100px]'>
                    <RadioButton
                      label='할인율'
                      value='percentage'
                      checked={formData.discountType === 'percentage'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          discountType: 'percentage',
                          discountAmount: '',
                        }))
                      }
                    />
                  </div>
                  <Input
                    type='text'
                    value={formData.discountPercentage || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        discountPercentage: e.target.value,
                        discountType: 'percentage',
                        discountAmount: '',
                      }))
                    }
                    placeholder=''
                    suffix='%'
                    disabled={formData.discountType === 'fixed'}
                  />
                </div>
              </div>
            </div>
          )}

          {formData.benefitType === 'gift' && (
            <div className='mt-4 p-2 w-[50%]'>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='min-w-[120px]'>
                    <RadioButton
                      label='일정금액 이상'
                      value='threshold'
                      checked={formData.giftType === 'threshold'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          giftType: 'threshold',
                        }))
                      }
                    />
                  </div>
                  <Input
                    type='text'
                    value={formData.minOrderAmount || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, minOrderAmount: e.target.value }))
                    }
                    placeholder='10000'
                    suffix='원'
                    disabled={formData.giftType !== 'threshold'}
                  />
                </div>

                <div className='flex items-center gap-4'>
                  <div className='min-w-[120px]'>
                    <RadioButton
                      label='무료증정'
                      value='free'
                      checked={formData.giftType === 'free'}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          giftType: 'free',
                          minOrderAmount: '',
                        }))
                      }
                    />
                  </div>
                  <span className='text-sm text-gray-500'>
                    조건 없이 무료로 증정하는 쿠폰입니다
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardSubtitle>
      </Card>

      {mode !== 'gift' && (
        <Card>
          <CardSubtitle label='쿠폰 이름' required>
            <Input
              value={formData.couponName || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, couponName: e.target.value }))}
              placeholder='가정의 달 쿠폰'
            />
          </CardSubtitle>
        </Card>
      )}

      {mode !== 'gift' && (
        <>
          <Card>
            <CardSubtitle label='쿠폰 사용 대상' required>
              <ToggleGroup
                type='single'
                value={formData.couponUsageType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, couponUsageType: value }))
                }
                className='grid grid-cols-2 gap-4'
              >
                <ToggleGroupItem value='all' className='flex-col items-start p-6 h-auto'>
                  <div className='text-lg font-medium mb-2'>모든 사용자</div>
                  <div className='text-sm text-gray-500'>
                    모든 고객이 사용할 수 있는 쿠폰을 만들어보세요
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value='regular' className='flex-col items-start p-6 h-auto'>
                  <div className='text-lg font-medium mb-2'>단골 전용</div>
                  <div className='text-sm text-gray-500'>
                    단골 고객만 사용할 수 있는 특별한 쿠폰을 만들어보세요
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>
            </CardSubtitle>
          </Card>

          <Card>
            <CardSubtitle label='발급 개수'>
              <div className='flex flex-row gap-4'>
                <RadioButton
                  label='제한 있어요'
                  value='limited'
                  checked={formData.issueType === 'limited'}
                  onChange={() => setFormData((prev) => ({ ...prev, issueType: 'limited' }))}
                />
                <RadioButton
                  label='제한 없어요'
                  value='unlimited'
                  checked={formData.issueType === 'unlimited'}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, issueType: 'unlimited', issueCount: '' }))
                  }
                />
              </div>
              {formData.issueType === 'limited' && (
                <div className='mt-4 flex items-center gap-2'>
                  <div className='w-32'>
                    <Input
                      type='text'
                      value={formData.issueCount || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, issueCount: e.target.value }))
                      }
                      placeholder='100'
                      suffix='개'
                    />
                  </div>
                </div>
              )}
            </CardSubtitle>
          </Card>
        </>
      )}

      <Card>
        <CardSubtitle label='사용 기한' required>
          <DatePickerWithDialog
            title='사용 기한'
            placeholder='기간을 선택해주세요'
            selectionMode='single'
            datePickerMode='range'
            selectedRanges={selectedDateRange}
            onRangeChange={(range) => {
              if (typeof range === 'function') {
                const newRange = range(selectedDateRange);
                if (!Array.isArray(newRange) && newRange) {
                  setSelectedDateRange(newRange);
                  if (newRange.startDate && newRange.endDate) {
                    setFormData((prev) => ({
                      ...prev,
                      startDate: newRange.startDate.toISOString().split('T')[0] || '',
                      endDate: newRange.endDate.toISOString().split('T')[0] || '',
                    }));
                  }
                }
              } else if (!Array.isArray(range) && range) {
                setSelectedDateRange(range);
                if (range.startDate && range.endDate) {
                  setFormData((prev) => ({
                    ...prev,
                    startDate: range.startDate.toISOString().split('T')[0] || '',
                    endDate: range.endDate.toISOString().split('T')[0] || '',
                  }));
                }
              }
            }}
          />
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='사용 조건'>
          <TextArea
            value={formData.usageConditions || ''}
            maxLength={1000}
            onChange={(e) => setFormData((prev) => ({ ...prev, usageConditions: e.target.value }))}
            placeholder='타 쿠폰과 중복 사용 불가, 한 테이블당 한번 사용 가능'
            rows={4}
          />
        </CardSubtitle>
      </Card>

      <div className='flex justify-center gap-4 mb-17'>
        {onCancel && (
          <Button type='button' variant='outlined' onClick={onCancel}>
            취소
          </Button>
        )}
        <Button type='button' onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '처리 중...' : submitText}
        </Button>
      </div>

      <Card>
        <CardSubtitle label='미리보기'>
          <Coupon
            title={
              mode === 'gift'
                ? previewCouponName || '대상 고객을 선택해주세요'
                : formData.couponName || '쿠폰 이름'
            }
            period={
              selectedDateRange
                ? `${selectedDateRange.startDate.toLocaleDateString('ko-KR')} ~ ${selectedDateRange.endDate.toLocaleDateString('ko-KR')}`
                : '기간 미설정'
            }
            statuses={
              mode === 'gift'
                ? ['단골 전용']
                : formData.couponUsageType === 'regular'
                  ? ['단골 전용', '발급중']
                  : ['발급중']
            }
            receivedCount={
              mode === 'gift'
                ? undefined
                : formData.issueType === 'limited' && formData.issueCount
                  ? parseInt(formData.issueCount)
                  : 0
            }
            purchaseCount={mode === 'gift' ? undefined : 0}
            usedCount={mode === 'gift' ? undefined : 0}
            canceledCount={mode === 'gift' ? undefined : 0}
            details={formData.usageConditions || '사용 조건 없음'}
            isActive={true}
          />
        </CardSubtitle>
      </Card>
    </CardForm>
  );
};
