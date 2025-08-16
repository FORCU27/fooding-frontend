'use client';

import { useState, useEffect } from 'react';

import { PutStoreBody } from '@repo/api/ceo';
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
  CheckBox,
} from '@repo/design-system/components/ceo';

import { useGetStore } from '@/hooks/store/useGetStore';
import { usePutStore } from '@/hooks/store/usePutStore';

const AdditionalPage = () => {
  const { data: store, isLoading } = useGetStore(15);
  const putStoreMutation = usePutStore();

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
    maxParkingFee: '5000', // 최대 요금
    additionalTimeHour: '0', // 추가 시간
    additionalTimeMinutes: '10', // 추가 분
    additionalFee: '3000', // 추가 요금

    // 시설/서비스
    facilities: [] as string[],

    // 결제 수단
    paymentMethods: [] as string[],

    // SNS 링크
    links: [] as { type: string; url: string }[],
  });

  // store 데이터로 폼 초기화
  useEffect(() => {
    if (store && !isInitialized) {
      console.log('Initializing additional info with store data:', store);

      // TODO: 실제 store 데이터 구조에 맞게 매핑 필요
      setFormData((prev) => ({
        ...prev, // 기존 초기값 유지
        isParkingAvailable: store.isParkingAvailable || false,
        // store에서 추가 데이터가 있으면 여기에 매핑
      }));
      setIsInitialized(true);
    }
  }, [store, isInitialized]);

  const handleSave = () => {
    if (!store) return;

    const putBody: PutStoreBody = {
      // 기존 데이터 유지
      name: store.name,
      regionId: store.regionId,
      city: store.city,
      address: store.address,
      category: store.category,
      description: store.description,
      priceCategory: store.priceCategory,
      eventDescription: store.eventDescription,
      contactNumber: store.contactNumber,
      direction: store.direction,
      information: store.information,
      latitude: store.latitude,
      longitude: store.longitude,
      isNewOpen: store.isNewOpen,
      isTakeOut: store.isTakeOut,

      // 부가정보 업데이트
      isParkingAvailable: formData.isParkingAvailable,
      // TODO: 추가 필드 매핑 필요
    };

    // undefined 값 제거
    const cleanedBody = Object.fromEntries(
      Object.entries(putBody).filter(([, value]) => value !== undefined),
    ) as PutStoreBody;

    console.log('PUT request body (additional):', JSON.stringify(cleanedBody, null, 2));

    putStoreMutation.mutate(
      { id: 15, body: cleanedBody },
      {
        onSuccess: () => {
          console.log('Additional info updated successfully');
          alert('저장되었습니다.');
        },
        onError: () => {
          alert('저장에 실패했습니다.');
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

  // 클라이언트 사이드에서만 로딩 상태 처리
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <CardForm className=''>
        <div className='headline-2'>부가 정보</div>
        <div>로딩 중...</div>
      </CardForm>
    );
  }

  return (
    <CardForm className='' onSubmit={(e) => e.preventDefault()}>
      <div className='headline-2'>부가 정보</div>
      <Card>
        <CardSubtitle label='홈페이지 / SNS 링크' required>
          <UrlLinkList />
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
                            type='texr'
                            value={formData.parkingFee}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, parkingFee: e.target.value }))
                            }
                            suffix='원'
                          />
                        </div>
                      </div>

                      <div className='ml-22'>
                        <CheckBox
                          labelText='무료'
                          // checked={checked}
                          // onChange={(e) => setChecked(e.target.checked)}
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
            variant='chip'
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
            variant='chip'
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
        <Button type='button' onClick={handleSave} disabled={putStoreMutation.isPending}>
          {putStoreMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      </div>
    </CardForm>
  );
};

export default AdditionalPage;
