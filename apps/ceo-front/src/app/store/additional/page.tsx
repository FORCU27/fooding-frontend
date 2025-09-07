'use client';

import { useState, useEffect } from 'react';

import { StoreInformationBody } from '@repo/api/ceo';
import {
  CardForm,
  Button,
  Card,
  Input,
  CardSubtitle,
  ToggleGroup,
  ToggleGroupItem,
  UrlLinkList,
  ToolTip,
  Checkbox,
} from '@repo/design-system/components/ceo';

import { useGetStoreInformation } from '@/hooks/store-information/useGetStoreInformation';
import { useUpdateStoreInformation } from '@/hooks/store-information/useUpdateStoreInformation';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const AdditionalPage = () => {
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();
  const { data: storeInformation, isLoading: isLoadingInfo } =
    useGetStoreInformation(selectedStoreId);
  const updateInformationMutation = useUpdateStoreInformation();

  const [isInitialized, setIsInitialized] = useState(false);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    // 주차 관련
    isParkingAvailable: false,
    parkingFeeType: '', // 'free' or 'paid'
    parkingTimeType: '', // 'time' or 'amount'
    maxParkingTime: '',
    parkingTimeUnit: '1', // 시간
    parkingTimeUnitMinutes: '60', // 분
    parkingFee: '3000', // 요금
    parkingBasicFree: false, // 최초요금 무료 체크박스
    maxParkingFee: '5000', // 최대 요금
    additionalTimeHour: '0', // 추가 시간
    additionalTimeMinutes: '10', // 추가 분
    additionalFee: '3000', // 추가 요금

    // 시설/서비스
    facilities: [] as string[],

    // 결제 수단
    paymentMethods: [] as string[],

    // SNS 링크 (string array for URLs)
    links: [] as string[],
  });

  // storeInformation 데이터로 폼 초기화
  useEffect(() => {
    if (storeInformation && !isInitialized) {
      // 주차 가능하고 모든 요금 필드가 null이면 무료 주차
      const isFreeParking =
        storeInformation.parkingAvailable &&
        !storeInformation.parkingChargeType &&
        !storeInformation.parkingBasicFee;

      const isPaidParking =
        storeInformation.parkingChargeType === 'PAID' ||
        storeInformation.parkingChargeType === 'HOURLY' ||
        storeInformation.parkingChargeType === 'FLAT_RATE' ||
        (storeInformation.parkingAvailable && storeInformation.parkingBasicFee);

      // 유료 주차인 경우 parkingTimeType 결정
      let parkingTimeType = '';
      if (isPaidParking) {
        // HOURLY면 시간당 과금, FLAT_RATE면 정액 과금
        if (storeInformation.parkingChargeType === 'HOURLY') {
          parkingTimeType = 'time';
        } else if (storeInformation.parkingChargeType === 'FLAT_RATE') {
          parkingTimeType = 'amount';
        } else {
          // 기본값은 시간당 과금
          parkingTimeType = 'time';
        }
      }

      setFormData({
        isParkingAvailable: storeInformation.parkingAvailable || false,
        parkingFeeType: isFreeParking ? 'free' : isPaidParking ? 'paid' : '',
        parkingTimeType: parkingTimeType,
        maxParkingTime: '',
        parkingTimeUnit: storeInformation.parkingBasicTimeMinutes
          ? Math.floor(storeInformation.parkingBasicTimeMinutes / 60).toString()
          : '1',
        parkingTimeUnitMinutes: storeInformation.parkingBasicTimeMinutes
          ? (storeInformation.parkingBasicTimeMinutes % 60).toString()
          : '0',
        parkingFee:
          storeInformation.parkingBasicFee === 0
            ? '0'
            : storeInformation.parkingBasicFee?.toString() || '3000',
        parkingBasicFree: storeInformation.parkingBasicFee === 0, // 0원이면 무료 체크
        maxParkingFee: storeInformation.parkingMaxDailyFee?.toString() || '5000',
        additionalTimeHour: storeInformation.parkingExtraMinutes
          ? Math.floor(storeInformation.parkingExtraMinutes / 60).toString()
          : '0',
        additionalTimeMinutes: storeInformation.parkingExtraMinutes
          ? (storeInformation.parkingExtraMinutes % 60).toString()
          : '10',
        additionalFee: storeInformation.parkingExtraFee?.toString() || '3000',
        facilities: storeInformation.facilities || [],
        paymentMethods: storeInformation.paymentMethods || [],
        links: storeInformation.links || [], // API returns string array directly
      });
      setIsInitialized(true);
    }
  }, [storeInformation, isInitialized]);

  const handleSave = () => {
    if (!selectedStoreId) return;

    // 주차 관련 데이터 계산
    const parkingBasicTimeMinutes =
      formData.isParkingAvailable && formData.parkingFeeType === 'paid'
        ? parseInt(formData.parkingTimeUnit) * 60 + parseInt(formData.parkingTimeUnitMinutes)
        : null;

    const parkingExtraMinutes =
      formData.isParkingAvailable && formData.parkingFeeType === 'paid'
        ? parseInt(formData.additionalTimeHour) * 60 + parseInt(formData.additionalTimeMinutes)
        : null;

    // 유료 주차일 때 시간당/정액 과금 체크
    if (
      formData.isParkingAvailable &&
      formData.parkingFeeType === 'paid' &&
      !formData.parkingTimeType
    ) {
      alert('유료 주차의 경우 시간당 과금 또는 정액 과금을 선택해주세요.');
      return;
    }

    const body: StoreInformationBody = {
      links: formData.links, // Already a string array
      facilities: formData.facilities,
      paymentMethods: formData.paymentMethods,
      parkingAvailable: formData.isParkingAvailable,
      // 무료 주차인 경우 모든 요금 관련 필드를 null로 설정
      parkingType:
        formData.isParkingAvailable && formData.parkingFeeType === 'paid'
          ? 'PAID' // 유료일 때는 PAID
          : null,
      parkingChargeType:
        formData.isParkingAvailable && formData.parkingFeeType === 'paid'
          ? formData.parkingTimeType === 'time'
            ? 'HOURLY'
            : 'FLAT_RATE' // 시간당이면 HOURLY, 정액이면 FLAT_RATE
          : null,
      parkingBasicTimeMinutes:
        formData.isParkingAvailable &&
        formData.parkingFeeType === 'paid' &&
        formData.parkingTimeType === 'time'
          ? parkingBasicTimeMinutes
          : null,
      parkingBasicFee:
        formData.isParkingAvailable && formData.parkingFeeType === 'paid'
          ? formData.parkingBasicFree
            ? 0
            : parseInt(formData.parkingFee) // 무료 체크시 0원
          : null,
      parkingExtraMinutes:
        formData.isParkingAvailable &&
        formData.parkingFeeType === 'paid' &&
        formData.parkingTimeType === 'time'
          ? parkingExtraMinutes
          : null,
      parkingExtraFee:
        formData.isParkingAvailable &&
        formData.parkingFeeType === 'paid' &&
        formData.parkingTimeType === 'time'
          ? parseInt(formData.additionalFee)
          : null,
      parkingMaxDailyFee:
        formData.isParkingAvailable && formData.parkingFeeType === 'paid'
          ? parseInt(formData.maxParkingFee)
          : null,
    };

    // storeInformation.id가 있으면 update, 없으면 create (현재는 update만 구현)
    if (!storeInformation?.id) {
      alert('부가정보를 먼저 생성해야 합니다.');
      return;
    }

    updateInformationMutation.mutate(
      { storeId: selectedStoreId, informationId: storeInformation.id, body },
      {
        onSuccess: () => {
          // alert('저장되었습니다.');
        },
        onError: () => {
          // alert('저장에 실패했습니다.');
        },
      },
    );
  };

  const handleParkingChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      isParkingAvailable: value === 'possible',
    }));
  };

  const handleParkingFeeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      parkingFeeType: value,
      // 유료로 변경시 기본값으로 시간당 과금 설정
      parkingTimeType: value === 'paid' && !prev.parkingTimeType ? 'time' : prev.parkingTimeType,
    }));
  };

  const handleFacilitiesChange = (values: string[]) => {
    setFormData((prev) => ({
      ...prev,
      facilities: values,
    }));
  };

  const handlePaymentMethodsChange = (values: string[]) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: values,
    }));
  };

  const handleLinksChange = (urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      links: urls,
    }));
  };

  // 클라이언트 사이드에서만 로딩 상태 처리
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // 로딩 상태 처리
  if (isLoadingStoreId || isLoadingInfo) {
    return (
      <CardForm className=''>
        <div className='headline-2'>부가 정보</div>
        <div>부가정보를 불러오는 중...</div>
      </CardForm>
    );
  }

  if (!selectedStoreId) {
    return (
      <CardForm className=''>
        <div className='headline-2'>부가 정보</div>
        <div>
          가게를 선택해주세요. <a href='/store/select'>가게 선택하기</a>
        </div>
      </CardForm>
    );
  }

  return (
    <CardForm className='' onSubmit={(e) => e.preventDefault()}>
      <div className='headline-2'>부가 정보</div>
      <Card>
        <CardSubtitle label='홈페이지 / SNS 링크' required>
          <UrlLinkList value={formData.links} onChange={handleLinksChange} />
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='주차 가능한가요?' required>
          <ToggleGroup
            type='single'
            value={formData.isParkingAvailable ? 'possible' : 'impossible'}
            onValueChange={handleParkingChange}
            className='grid grid-cols-2'
          >
            <ToggleGroupItem value='possible'>가능해요</ToggleGroupItem>
            <ToggleGroupItem value='impossible'>불가능해요</ToggleGroupItem>
          </ToggleGroup>

          {formData.isParkingAvailable && (
            <>
              <ToggleGroup
                type='single'
                value={formData.parkingFeeType}
                onValueChange={handleParkingFeeChange}
                className='grid grid-cols-2 mt-4'
              >
                <ToggleGroupItem value='paid'>유료</ToggleGroupItem>
                <ToggleGroupItem value='free'>무료</ToggleGroupItem>
              </ToggleGroup>

              {formData.parkingFeeType === 'paid' && (
                <>
                  <div className='flex items-center gap-2 mt-4'>
                    <input
                      type='radio'
                      id='time-based'
                      name='parkingTimeType'
                      value='time'
                      checked={formData.parkingTimeType === 'time'}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, parkingTimeType: e.target.value }))
                      }
                      className='w-4 h-4'
                    />
                    <label htmlFor='time-based' className='text-sm font-medium'>
                      시간당 과금
                    </label>

                    <input
                      type='radio'
                      id='amount-based'
                      name='parkingTimeType'
                      value='amount'
                      checked={formData.parkingTimeType === 'amount'}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, parkingTimeType: e.target.value }))
                      }
                      className='w-4 h-4 ml-6'
                    />
                    <label htmlFor='amount-based' className='text-sm font-medium'>
                      정액 과금
                    </label>
                  </div>

                  {formData.parkingTimeType === 'time' && (
                    <div className='mt-4 space-y-4'>
                      {/* 최초요금 */}
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-600 min-w-[80px]'>최초요금</span>
                        <div className='w-[87px]'>
                          <Input
                            type='text'
                            value={formData.parkingTimeUnit}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, parkingTimeUnit: e.target.value }))
                            }
                            placeholder='1'
                            suffix='시간'
                          />
                        </div>
                        <div className='w-[87px]'>
                          <Input
                            type='text'
                            value={formData.parkingTimeUnitMinutes}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                parkingTimeUnitMinutes: e.target.value,
                              }))
                            }
                            placeholder='10'
                            suffix='분'
                          />
                        </div>
                        <div className='w-[115px]'>
                          <Input
                            type='text'
                            value={formData.parkingBasicFree ? '0' : formData.parkingFee}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, parkingFee: e.target.value }))
                            }
                            disabled={formData.parkingBasicFree}
                            suffix='원'
                          />
                        </div>
                      </div>

                      <div className='ml-22'>
                        <Checkbox
                          labelText='무료'
                          checked={formData.parkingBasicFree}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, parkingBasicFree: e.target.checked }))
                          }
                        />
                      </div>

                      {/* 추가요금 */}
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-600 w-20'>추가요금</span>
                        <div className='w-[87px]'>
                          <Input
                            value={formData.additionalTimeHour}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                additionalTimeHour: e.target.value,
                              }))
                            }
                            suffix='시간'
                          />
                        </div>
                        <div className='w-[87px]'>
                          <Input
                            value={formData.additionalTimeMinutes}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                additionalTimeMinutes: e.target.value,
                              }))
                            }
                            suffix='분'
                          />
                        </div>
                        <div className='w-[115px]'>
                          <Input
                            value={formData.additionalFee}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, additionalFee: e.target.value }))
                            }
                            suffix='원'
                          />
                        </div>
                      </div>

                      {/* 최대 */}
                      <div className='flex items-center gap-2 ml-[245px]'>
                        <span className='text-sm text-gray-600'>최대</span>
                        <div className='w-[115px]'>
                          <Input
                            value={formData.maxParkingFee}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, maxParkingFee: e.target.value }))
                            }
                            placeholder='9999'
                            suffix='원'
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {formData.parkingTimeType === 'amount' && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-600 w-20'>종일권</span>
                      <div className='w-[115px]'>
                        <Input
                          value={formData.maxParkingFee}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, maxParkingFee: e.target.value }))
                          }
                          placeholder='999999'
                          suffix='원'
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='시설/서비스 정보' required>
          <ToggleGroup
            type='multiple'
            // variant='chip'
            value={formData.facilities}
            onValueChange={handleFacilitiesChange}
            className='w-full'
          >
            <ToggleGroupItem value='group'>단체이용 가능</ToggleGroupItem>
            <ToggleGroupItem value='takeout'>포장</ToggleGroupItem>
            <ToggleGroupItem value='delivery'>배달</ToggleGroupItem>
            <ToggleGroupItem value='reception'>방문접수/출장</ToggleGroupItem>
            <ToggleGroupItem value='reservation'>예약</ToggleGroupItem>
            <ToggleGroupItem value='wifi'>무선인터넷</ToggleGroupItem>
            <ToggleGroupItem value='kids'>유아시설/놀이방</ToggleGroupItem>
            <ToggleGroupItem value='toilet'>남/녀 화장실 구분</ToggleGroupItem>
            <ToggleGroupItem value='chair'>유아의자</ToggleGroupItem>
            <ToggleGroupItem value='waiting'>대기공간</ToggleGroupItem>
            <ToggleGroupItem value='no-kids'>노키즈존</ToggleGroupItem>
          </ToggleGroup>
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='이용가능한 결제 수단' required>
          <ToolTip>
            네이버,카카오페이,페이코,애플페이 등 QR코드결제 또는 바코드 결제가 가능한 경우
            간편결제를 선택해주세요
          </ToolTip>
          <ToggleGroup
            type='multiple'
            // variant='chip'
            value={formData.paymentMethods}
            onValueChange={handlePaymentMethodsChange}
            className='w-full'
          >
            <ToggleGroupItem value='local-paper'>지역화폐 (지류형)</ToggleGroupItem>
            <ToggleGroupItem value='local-card'>지역화폐 (카드형)</ToggleGroupItem>
            <ToggleGroupItem value='local-mobile'>지역화폐 (모바일형)</ToggleGroupItem>
            <ToggleGroupItem value='zeropay'>제로페이</ToggleGroupItem>
            <ToggleGroupItem value='simple'>간편결제</ToggleGroupItem>
          </ToggleGroup>
        </CardSubtitle>
      </Card>

      <div className='flex justify-center mb-17'>
        <Button type='button' onClick={handleSave} disabled={updateInformationMutation.isPending}>
          {updateInformationMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      </div>
    </CardForm>
  );
};

export default AdditionalPage;
