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
  couponName: string;
  benefitType: string;
  discountType: string;
  discountPercentage: string;
  discountAmount: string;
  giftItem: string;
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
  initialData?: Partial<CouponFormData>;
  initialDateRange?: SelectedRangeItem | null;
  onSubmit: (data: CouponFormData, dateRange: SelectedRangeItem | null) => Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  isSubmitting?: boolean;
}

export const CouponForm = ({
  title,
  initialData,
  initialDateRange,
  onSubmit,
  onCancel,
  submitText = '생성하기',
  isSubmitting = false,
}: CouponFormProps) => {
  const [formData, setFormData] = useState<CouponFormData>({
    couponName: '',
    benefitType: 'discount',
    discountType: '',
    discountPercentage: '',
    discountAmount: '',
    giftItem: '',
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
    initialDateRange || null
  );

  // 초기 데이터가 변경되면 폼 업데이트
  useEffect(() => {
    if (initialData) {
      console.log('Setting form data with:', initialData);
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]); // initialData가 변경될 때마다 실행

  useEffect(() => {
    if (initialDateRange) {
      console.log('Setting date range with:', initialDateRange);
      setSelectedDateRange(initialDateRange);
    }
  }, [initialDateRange]); // initialDateRange가 변경될 때마다 실행

  const handleBenefitTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      benefitType: value,
      discountType: value === 'discount' ? '' : prev.discountType,
      discountPercentage: '',
      discountAmount: '',
      giftItem: '',
    }));
  };

  const handleSubmit = async () => {
    if (!formData.couponName) {
      alert('쿠폰 이름을 입력해주세요.');
      return;
    }

    if (formData.benefitType === 'discount') {
      if (!formData.discountPercentage && !formData.discountAmount) {
        alert('할인율 또는 할인 금액을 입력해주세요.');
        return;
      }
    } else if (formData.benefitType === 'gift' && !formData.giftItem) {
      alert('증정 품목을 입력해주세요.');
      return;
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
        <CardSubtitle label='쿠폰 이름' required>
          <Input
            value={formData.couponName}
            onChange={(e) => setFormData((prev) => ({ ...prev, couponName: e.target.value }))}
            placeholder='가정의 달 쿠폰'
          />
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='쿠폰 사용 대상' required>
          <div className='flex gap-4'>
            <RadioButton
              label='모든 사용자'
              value='all'
              checked={formData.couponUsageType === 'all'}
              onChange={() => setFormData((prev) => ({ ...prev, couponUsageType: 'all' }))}
            />
            <RadioButton
              label='단골 전용'
              value='regular'
              checked={formData.couponUsageType === 'regular'}
              onChange={() => setFormData((prev) => ({ ...prev, couponUsageType: 'regular' }))}
            />
          </div>
        </CardSubtitle>
      </Card>

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
            <div className='mt-4 p-6'>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='min-w-[100px]'>
                    <RadioButton
                      label='금액'
                      value='fixed'
                      checked={formData.discountType === 'fixed' || !formData.discountPercentage}
                      onChange={() => setFormData((prev) => ({ 
                        ...prev, 
                        discountType: 'fixed',
                        discountPercentage: '',
                      }))}
                    />
                  </div>
                  <Input
                    type='text'
                    value={formData.discountAmount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discountAmount: e.target.value }))}
                    placeholder=''
                    suffix='원'
                    disabled={formData.discountType === 'percentage' && !!formData.discountPercentage}
                  />
                </div>

                <div className='flex items-center gap-4'>
                  <div className='min-w-[100px]'>
                    <RadioButton
                      label='할인율'
                      value='percentage'
                      checked={formData.discountType === 'percentage' || !!formData.discountPercentage}
                      onChange={() => setFormData((prev) => ({ 
                        ...prev, 
                        discountType: 'percentage',
                        discountAmount: '',
                      }))}
                    />
                  </div>
                  <Input
                    type='text'
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discountPercentage: e.target.value }))}
                    placeholder=''
                    suffix='%'
                    disabled={formData.discountType === 'fixed' && !!formData.discountAmount}
                  />
                </div>
              </div>
            </div>
          )}

          {formData.benefitType === 'gift' && (
            <div className='mt-4 p-6'>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='min-w-[100px]'>
                    <label className='text-sm'>증정품목</label>
                  </div>
                  <Input
                    type='text'
                    value={formData.giftItem}
                    onChange={(e) => setFormData((prev) => ({ ...prev, giftItem: e.target.value }))}
                    placeholder='예: 아메리카노 1잔'
                  />
                </div>
              </div>
            </div>
          )}
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='최소 주문 금액'>
          <Input
            type='text'
            value={formData.minOrderAmount}
            onChange={(e) => setFormData((prev) => ({ ...prev, minOrderAmount: e.target.value }))}
            placeholder='0'
            suffix='원'
          />
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
              onChange={() => setFormData((prev) => ({ ...prev, issueType: 'unlimited', issueCount: '' }))}
            />
          </div>
          {formData.issueType === 'limited' && (
            <div className='mt-4 flex items-center gap-2'>
              <div className='w-32'>
                <Input
                  type='text'
                  value={formData.issueCount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, issueCount: e.target.value }))}
                  placeholder='100'
                  suffix='개'
                />
              </div>
            </div>
          )}
        </CardSubtitle>
      </Card>

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
            value={formData.usageConditions}
            maxLength={1000}
            onChange={(e) => setFormData((prev) => ({ ...prev, usageConditions: e.target.value }))}
            placeholder='타 쿠폰과 중복 사용 불가, 한 테이블당 한번 사용 가능'
            rows={4}
          />
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='미리보기'>
          <Coupon
            title={formData.couponName || '쿠폰 이름'}
            period={
              selectedDateRange
                ? `${selectedDateRange.startDate.toLocaleDateString('ko-KR')} ~ ${selectedDateRange.endDate.toLocaleDateString('ko-KR')}`
                : '기간 미설정'
            }
            statuses={formData.couponUsageType === 'regular' ? ['단골 전용', '발급중'] : ['발급중']}
            receivedCount={0}
            purchaseCount={0}
            usedCount={0}
            canceledCount={0}
            details={formData.usageConditions || '사용 조건 없음'}
            isActive={true}
          />
        </CardSubtitle>
      </Card>

      <div className='flex justify-center gap-4 mb-17'>
        {onCancel && (
          <Button type='button' variant='outline' onClick={onCancel}>
            취소
          </Button>
        )}
        <Button 
          type='button' 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '처리 중...' : submitText}
        </Button>
      </div>
    </CardForm>
  );
};