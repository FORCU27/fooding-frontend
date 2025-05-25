import { B2BCounterMinusIcon, B2BCounterPlusIcon } from '@repo/design-system/icons';

import { StepProps } from '../types';
import Button from '@/components/Button';

type CounterButtonProps = {
  onClick: () => void;
  isPlus?: boolean;
};

const CounterButton = ({ onClick, isPlus = false }: CounterButtonProps) => (
  <button onClick={onClick}>{isPlus ? <B2BCounterPlusIcon /> : <B2BCounterMinusIcon />}</button>
);

type CounterProps = {
  label: string;
  count: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const Counter = ({ label, count, onDecrease, onIncrease }: CounterProps) => (
  <div className='bg-white rounded-lg border-2 border-gray-2 p-8 w-[404px] h-[102px]'>
    <div className='flex items-center justify-between'>
      <div className='subtitle-3'>{label}</div>
      <div className='flex items-center space-x-1'>
        <CounterButton onClick={onDecrease} />
        <span className='w-8 text-center'>{count}</span>
        <CounterButton onClick={onIncrease} isPlus />
      </div>
    </div>
  </div>
);

export function MemberCountStep({ formData, updateFormData, onNext, onPrev }: StepProps) {
  const { infantCount, adultCount } = formData;
  const totalCount = infantCount + adultCount;

  return (
    <div className='flex items-center flex-col'>
      <div className='headline-5 font-bold mb-2'>입장 인원</div>
      <p className='text-sm text-gray-5 body-2-1 mb-[70px]'>총 입장 인원을 입력해주세요</p>

      <div className='mb-[104px]'>
        <div className='grid grid-rows gap-4 mb-10'>
          <Counter
            label='유아'
            count={infantCount}
            onDecrease={() => updateFormData('infantCount', Math.max(0, infantCount - 1))}
            onIncrease={() => updateFormData('infantCount', infantCount + 1)}
          />

          <Counter
            label='성인'
            count={adultCount}
            onDecrease={() => updateFormData('adultCount', Math.max(0, adultCount - 1))}
            onIncrease={() => updateFormData('adultCount', adultCount + 1)}
          />
        </div>

        <div className='flex items-center justify-between px-[30px]'>
          <div className='subtitle-3'>총인원</div>
          <div className='subtitle-3 text-gray-3 flex items-center space-x-4 text-primary-pink'>
            <div className='flex items-center'>
              <span className='w-[40px] whitespace-nowrap'>성인</span>
              <span className='w-[40px] text-right'>{adultCount}</span>
            </div>
            <div className='flex items-center'>
              <span className='w-[40px] whitespace-nowrap'>유아</span>
              <span className='w-[40px] text-right'>{infantCount}</span>
            </div>
          </div>
        </div>
      </div>
      <Button size='sm' variant='default' onClick={onNext} disabled={totalCount === 0}>
        다음
      </Button>
    </div>
  );
}
