import { WaitingRegisterData, UpdateWaitingRegisterData } from '../types';

interface MemberCountStepProps {
  formData: WaitingRegisterData;
  updateFormData: UpdateWaitingRegisterData;
  onNext: () => void;
  onPrev: () => void;
}

export function MemberCountStep({
  formData,
  updateFormData,
  onNext,
  onPrev,
}: MemberCountStepProps) {
  const { members } = formData;

  const handleCountChange = (key: keyof typeof members, delta: number) => {
    const newValue = Math.max(0, members[key] + delta);
    updateFormData('members', {
      ...members,
      [key]: newValue,
    });
  };

  const totalCount = members.adult + members.child;
  const isValid = totalCount > 0;

  return (
    <div className='min-h-screen flex flex-col pb-[80px]'>
      <div className='flex-1 space-y-4 p-4'>
        <h2 className='text-xl font-semibold mb-6 text-center'>총 입장 인원을 입력해주세요</h2>
        <p className='text-sm text-gray-500 mb-4'>
          인원 수에 맞는 좌석이 준비 안될 경우 입장 순서가 바뀔 수도 있어요
        </p>

        <div className='space-y-6'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8'>
            <div className='flex items-center justify-between'>
              <span>성인</span>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => handleCountChange('adult', -1)}
                  className='w-8 h-8 rounded-full border border-gray-300'
                >
                  -
                </button>
                <span className='w-8 text-center'>{members.adult}</span>
                <button
                  onClick={() => handleCountChange('adult', 1)}
                  className='w-8 h-8 rounded-full border border-gray-300'
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-4'>
            <div className='flex items-center justify-between'>
              <span>유아</span>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => handleCountChange('child', -1)}
                  className='w-8 h-8 rounded-full border border-gray-300'
                >
                  -
                </button>
                <span className='w-8 text-center'>{members.child}</span>
                <button
                  onClick={() => handleCountChange('child', 1)}
                  className='w-8 h-8 rounded-full border border-gray-300'
                >
                  +
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
              <span className='text-sm text-gray-500'>유아용 의자</span>
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => handleCountChange('childChair', -1)}
                  className='w-8 h-8 rounded-full border border-gray-300'
                >
                  -
                </button>
                <span className='w-8 text-center'>{members.childChair}</span>
                <button
                  onClick={() => handleCountChange('childChair', 1)}
                  className='w-8 h-8 rounded-full border border-gray-300'
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white'>
        <div className='flex gap-4'>
          <button onClick={onPrev} className='flex-1 py-4 rounded-lg border border-gray-300'>
            이전
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`flex-1 py-4 rounded-lg ${
              isValid ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            다음 (총 입장인원: {totalCount}명)
          </button>
        </div>
      </div>
    </div>
  );
}
