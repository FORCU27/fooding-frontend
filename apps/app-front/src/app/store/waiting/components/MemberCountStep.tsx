import { WaitingRegisterData, UpdateWaitingRegisterData, StepProps } from '../types';
import Button from '@/components/Button';

export function MemberCountStep({ formData, updateFormData, onNext, onPrev }: StepProps) {
  const { infantCount, infantChairCount, adultCount } = formData;

  const totalCount = infantCount + adultCount;
  const isValid = totalCount > 0;

  return (
    <div className='flex items-center flex-col'>
      <div className='headline-3 font-bold'>입장 인원</div>
      <p className='text-sm text-gray-500 mb-4'>총 입장 인원을 입력해주세요</p>

      <div className='space-y-6 subtitle-2'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8'>
          <div className='flex items-center justify-between'>
            <div>유아</div>
            <div className='flex items-center space-x-1'>
              <button
                onClick={() => updateFormData('infantCount', infantCount - 1)}
                className='w-8 h-8 border-gray-300'
              >
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.94531 15H22.0582'
                    stroke='#767676'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <circle cx='15' cy='15' r='14' stroke='#767676' strokeWidth='2' />
                </svg>
              </button>
              <span className='w-8 text-center'>{infantCount}</span>
              <button onClick={() => updateFormData('infantCount', infantCount + 1)}>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.0018 7.94531V22.0582M7.94531 15.0018H22.0582'
                    stroke='#767676'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <circle cx='15' cy='15' r='14' stroke='#767676' strokeWidth='2' />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-4'>
          <div className='flex items-center justify-between'>
            <div>성인</div>
            <div className='flex items-center space-x-1'>
              <button onClick={() => updateFormData('adultCount', adultCount - 1)}>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.94531 15H22.0582'
                    stroke='#767676'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <circle cx='15' cy='15' r='14' stroke='#767676' strokeWidth='2' />
                </svg>
              </button>
              <span className='w-8 text-center'>{adultCount}</span>
              <button onClick={() => updateFormData('adultCount', adultCount + 1)}>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15.0018 7.94531V22.0582M7.94531 15.0018H22.0582'
                    stroke='#767676'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <circle cx='15' cy='15' r='14' stroke='#767676' strokeWidth='2' />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between '>
          <div className='subtitle-2'>총인원</div>
          <div className='subtitle-2 text-gray-3 flex items-center space-x-4'>
            <div>성인 {adultCount}</div>
            <div>유아 {infantCount}</div>
          </div>
        </div>
        <Button size='sm' variant={'default'} className=''>
          줄서기
        </Button>
      </div>
    </div>
  );
}
