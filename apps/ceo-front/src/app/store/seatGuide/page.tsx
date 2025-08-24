'use client';

import { useState, useEffect } from 'react';

import { PutStoreBody } from '@repo/api/ceo';
import {
  CardForm,
  Button,
  Card,
  Input,
  TextArea,
  CardSubtitle,
  ToggleGroup,
  ToggleGroupItem,
  Checkbox,
  ToolTip,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from '@repo/design-system/components/ceo';

import { useGetStore } from '@/hooks/store/useGetStore';
import { usePutStore } from '@/hooks/store/usePutStore';

const SeatGuidePage = () => {
  const { data: store, isLoading } = useGetStore(15);
  const putStoreMutation = usePutStore();

  const [mounted, setMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    // 영업 시간
    openTime: '00:00',
    closeTime: '00:00',
    is24Hours: false,

    // 휴게 시간
    hasBreakTime: false,
    breakStartTime: '00:00',
    breakEndTime: '00:00',

    // 영업 시간 기타 정보
    businessHoursNote: '',

    // 휴무일
    hasClosedDays: false,
    closedDaysNote: '',

    // 정기 휴무일
    regularClosedDays: [] as string[],

    // 공휴일 휴무
    holidayClosedOptions: [] as string[],

    // 미리보기 캘린더
    selectedMonth: new Date(),
  });

  // store 데이터로 폼 초기화
  useEffect(() => {
    if (store && !isInitialized) {
      setFormData((prev) => ({
        ...prev,
        // TODO: store 데이터 매핑
      }));
      setIsInitialized(true);
    }
  }, [store, isInitialized]);

  // 클라이언트 사이드에서만 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <CardForm className=''>
        <div className='headline-2'>영업 시간 / 휴무일</div>
        <div>로딩 중...</div>
      </CardForm>
    );
  }

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
      isParkingAvailable: store.isParkingAvailable,

      // TODO: 영업시간 데이터 매핑
    };

    const cleanedBody = Object.fromEntries(
      Object.entries(putBody).filter(([, value]) => value !== undefined),
    ) as PutStoreBody;

    putStoreMutation.mutate(
      { id: 15, body: cleanedBody },
      {
        onSuccess: () => {
          alert('저장되었습니다.');
        },
        onError: () => {
          alert('저장에 실패했습니다.');
        },
      },
    );
  };

  // 캘린더 관련 함수들
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // 이전 달의 빈 날짜들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // 이번 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setFormData((prev) => ({
      ...prev,
      selectedMonth: new Date(prev.selectedMonth.getFullYear(), prev.selectedMonth.getMonth() - 1),
    }));
  };

  const handleNextMonth = () => {
    setFormData((prev) => ({
      ...prev,
      selectedMonth: new Date(prev.selectedMonth.getFullYear(), prev.selectedMonth.getMonth() + 1),
    }));
  };

  return (
    <>
      <CardForm className='' onSubmit={(e) => e.preventDefault()}>
        <div className='headline-2'>영업 시간 / 휴무일</div>

        {/* 영업 시간 */}
        <Card>
          <CardSubtitle label='영업 시간을 알려주세요'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 '>
                {/* <RadioGroup name='payment' className='flex-row' direction='vertical'>
                  <RadioButton id='payment-1' value='option1'>
                    매일 같아요
                  </RadioButton>
                  <RadioButton id='payment-2' value='option2'>
                    요일마다 달라요
                  </RadioButton>
                  <RadioButton id='payment-3' value='option3'>
                    24시간 영업
                  </RadioButton>
                </RadioGroup> */}
              </div>

              <div className='flex items-center gap-2'>
                <Input
                  type='time'
                  value={formData.openTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, openTime: e.target.value }))}
                />
                <span className='text-gray-600'>-</span>
                <Input
                  type='time'
                  value={formData.closeTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, closeTime: e.target.value }))}
                />
              </div>
            </div>
          </CardSubtitle>
        </Card>

        {/* 휴게 시간 */}
        <Card>
          <CardSubtitle label='휴게 시간을 알려주세요'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                {/* <RadioGroup name='payment' className='flex-row' direction='vertical'>
                  <RadioButton id='payment-1' value='option1'>
                    매일 같아요
                  </RadioButton>
                  <RadioButton id='payment-2' value='option2'>
                    요일마다 달라요
                  </RadioButton>
                  <RadioButton id='payment-3' value='option3'>
                    24시간 영업
                  </RadioButton>
                </RadioGroup> */}
              </div>

              <div className='flex items-center gap-2'>
                <Input
                  type='time'
                  value={formData.breakStartTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, breakStartTime: e.target.value }))
                  }
                />
                <span className='text-gray-600'>-</span>
                <Input
                  type='time'
                  value={formData.breakEndTime}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, breakEndTime: e.target.value }))
                  }
                />
              </div>
              <Button variant='outline' className='text-sm'>
                + 추가
              </Button>
            </div>
          </CardSubtitle>
        </Card>

        {/* 영업 시간 관련 기타 정보 */}
        <Card>
          <CardSubtitle label='영업 시간 관련 기타 정보'>
            <Input
              placeholder='연중무휴'
              value={formData.businessHoursNote}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, businessHoursNote: e.target.value }))
              }
              className='w-full min-h-[100px]'
            />
          </CardSubtitle>
        </Card>

        {/* 휴무일 */}
        <Card>
          <CardSubtitle label='휴무일이 있나요?'>
            <ToggleGroup
              type='single'
              value={formData.hasClosedDays ? 'yes' : 'no'}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, hasClosedDays: value === 'yes' }))
              }
              className='grid grid-cols-2'
            >
              <ToggleGroupItem value='yes'>휴무일이 있어요</ToggleGroupItem>
              <ToggleGroupItem value='no'>휴무일이 없어요</ToggleGroupItem>
            </ToggleGroup>
          </CardSubtitle>
        </Card>

        {formData.hasClosedDays && (
          <>
            {/* 정기 휴무일 */}
            <Card>
              <CardSubtitle label='정기 휴무일이 있나요?'>
                <ToggleGroup
                  type='multiple'
                  // variant='chip'
                  value={formData.regularClosedDays}
                  onValueChange={(values) =>
                    setFormData((prev) => ({ ...prev, regularClosedDays: values }))
                  }
                  className='w-full'
                >
                  <ToggleGroupItem value='주가'>주가</ToggleGroupItem>
                  <ToggleGroupItem value='월'>월</ToggleGroupItem>
                  <ToggleGroupItem value='화'>화</ToggleGroupItem>
                  <ToggleGroupItem value='수'>수</ToggleGroupItem>
                  <ToggleGroupItem value='목'>목</ToggleGroupItem>
                  <ToggleGroupItem value='금'>금</ToggleGroupItem>
                  <ToggleGroupItem value='토'>토</ToggleGroupItem>
                  <ToggleGroupItem value='일'>일</ToggleGroupItem>
                </ToggleGroup>
              </CardSubtitle>
            </Card>

            {/* 공휴일 휴무 */}
            <Card>
              <CardSubtitle label='공휴일중 휴무일이 있나요?'>
                <Checkbox
                  labelText='전체 선택'
                  checked={formData.holidayClosedOptions.length === 11}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        holidayClosedOptions: [
                          '새해첫날',
                          '삼일절',
                          '설날',
                          '어린이날',
                          '추석',
                          '현충일',
                          '광복절',
                          '개천절',
                          '부처님오신날',
                          '한글날',
                          '성탄절',
                        ],
                      }));
                    } else {
                      setFormData((prev) => ({ ...prev, holidayClosedOptions: [] }));
                    }
                  }}
                />

                <ToggleGroup
                  type='multiple'
                  // variant='chip'
                  value={formData.holidayClosedOptions}
                  onValueChange={(values) =>
                    setFormData((prev) => ({ ...prev, holidayClosedOptions: values }))
                  }
                  className='w-full mt-4'
                >
                  <ToggleGroupItem value='새해첫날'>새해 첫날</ToggleGroupItem>
                  <ToggleGroupItem value='삼일절'>삼일절</ToggleGroupItem>
                  <ToggleGroupItem value='설날'>설날</ToggleGroupItem>
                  <ToggleGroupItem value='어린이날'>어린이날</ToggleGroupItem>
                  <ToggleGroupItem value='추석'>추석</ToggleGroupItem>
                  <ToggleGroupItem value='현충일'>현충일</ToggleGroupItem>
                  <ToggleGroupItem value='광복절'>광복절</ToggleGroupItem>
                  <ToggleGroupItem value='개천절'>개천절</ToggleGroupItem>
                  <ToggleGroupItem value='부처님오신날'>부처님 오신날</ToggleGroupItem>
                  <ToggleGroupItem value='한글날'>한글날</ToggleGroupItem>
                  <ToggleGroupItem value='성탄절'>성탄절</ToggleGroupItem>
                </ToggleGroup>
              </CardSubtitle>
            </Card>

            {/* 그 외 휴무일 */}
            <Card>
              <CardSubtitle label='그 외 휴무일이 있다면?'>
                <ToolTip>
                  임시 휴무일을 저희에서는 영업시간란 조회에서디는 표시하지나다. 휴무일은
                  표시합니다!
                </ToolTip>
                <TextArea
                  placeholder='휴무일을 입력해주세요'
                  value={formData.closedDaysNote}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, closedDaysNote: e.target.value }))
                  }
                  className='w-full min-h-[100px]'
                />
              </CardSubtitle>
            </Card>
          </>
        )}

        {/* 미리보기 */}
        <div className='headline-2 mt-8'>미리보기</div>
        <ToolTip>미리보기에서 설정한 정보가 정확히 반영되었는지 다시 확인해 주세요</ToolTip>
        <Card>
          <CardSubtitle label=''>
            {/* 캘린더 */}
            <div className='mt-4'>
              <div className='flex items-center justify-between mb-4'>
                <Button variant='ghost' onClick={handlePrevMonth}>
                  <ChevronLeft className='w-4 h-4' />
                </Button>
                <span className='font-medium'>
                  {formData.selectedMonth.getFullYear()}년 {formData.selectedMonth.getMonth() + 1}월
                </span>
                <Button variant='ghost' onClick={handleNextMonth}>
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </div>

              <div className='grid grid-cols-7 gap-1'>
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div key={day} className='text-center text-sm text-gray-600 py-2'>
                    {day}
                  </div>
                ))}

                {getDaysInMonth(formData.selectedMonth).map((day, index) => (
                  <div
                    key={index}
                    className={`text-center py-2 ${day ? 'text-gray-900' : ''} ${
                      day && index % 7 === 0 ? 'text-red-500' : ''
                    } ${day && index % 7 === 6 ? 'text-blue-500' : ''}`}
                  >
                    {day || ''}
                  </div>
                ))}
              </div>

              {/* 영업 시간 정보 */}
              <div className='mt-6 space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-gray-500' />
                  <span className='text-gray-600'>매일</span>
                  <span className='font-medium'>00:00 - 00:00</span>
                </div>
                <div className='flex items-center gap-2 ml-6'>
                  <span className='text-gray-600'>월</span>
                  <span>00:00 - 00:00</span>
                </div>
                <div className='flex items-center gap-2 ml-6'>
                  <span className='text-gray-600'>화</span>
                  <span>00:00 - 00:00</span>
                </div>
                <div className='flex items-center gap-2 ml-6'>
                  <span className='text-gray-600'>수</span>
                  <span>00:00 - 00:00</span>
                </div>
                <div className='flex items-center gap-2 ml-6'>
                  <span className='text-gray-600'>목</span>
                  <span>00:00 - 00:00</span>
                </div>
                <div className='flex items-center gap-2 ml-6'>
                  <span className='text-gray-600'>금</span>
                  <span>00:00 - 00:00</span>
                </div>
                <div className='flex items-center gap-2 ml-6'>
                  <span className='text-gray-600'>토</span>
                  <span>00:00 - 00:00</span>
                </div>
                <div className='flex items-center gap-2 ml-6'>
                  <span className='text-gray-600'>일</span>
                  <span>00:00 - 00:00</span>
                </div>
              </div>
            </div>
          </CardSubtitle>
        </Card>

        <div className='flex justify-center mb-17'>
          <Button type='button' onClick={handleSave} disabled={putStoreMutation.isPending}>
            {putStoreMutation.isPending ? '저장 중...' : '저장'}
          </Button>
        </div>
      </CardForm>
    </>
  );
};

export default SeatGuidePage;
