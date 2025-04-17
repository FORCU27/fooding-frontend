interface TermsStepProps {
  formData: {
    terms: {
      service: boolean;
      privacy: boolean;
      privacy2: boolean;
      marketing: boolean;
    };
  };
  updateFormData: (key: string, value: any) => void;
  onNext: () => void;
}

export function TermsStep({ formData, updateFormData, onNext }: TermsStepProps) {
  const { terms } = formData;

  const handleTermChange = (key: keyof typeof terms) => {
    updateFormData('terms', {
      ...terms,
      [key]: !terms[key],
    });
  };

  const handleAgreeAll = () => {
    const allChecked = Object.values(terms).every((value) => value === true);
    const newValue = !allChecked;

    updateFormData('terms', {
      service: newValue,
      privacy: newValue,
      privacy2: newValue,
      marketing: newValue,
    });
  };

  const isAllRequired = terms.service && terms.privacy && terms.privacy2;
  const isAllChecked = Object.values(terms).every((value) => value === true);

  return (
    <div className='min-h-screen flex flex-col pb-[80px]'>
      <div className='flex-1 space-y-4 p-4'>
        <h2 className='text-xl font-semibold mb-6 text-center'>이용 약관을 확인해주세요</h2>

        <div className=' p-4 rounded-lg mb-4'>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={isAllChecked}
              onChange={handleAgreeAll}
              className='mr-2 w-5 h-5 accent-orange-500 flex-shrink-0'
            />
            <span className='font-semibold'>전체동의</span>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={terms.service}
                onChange={() => handleTermChange('service')}
                className='mr-2 w-5 h-5 accent-orange-500 flex-shrink-0'
              />
              <span>
                <span className='text-red-500'>(필수)</span> 서비스 이용약관에 동의합니다.
              </span>
            </div>
            <button className='text-gray-500 text-sm underline'>자세히 보기</button>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={terms.privacy}
                onChange={() => handleTermChange('privacy')}
                className='mr-2 w-5 h-5 accent-orange-500 flex-shrink-0'
              />
              <span>
                <span className='text-red-500'>(필수)</span> 개인정보 수집 및 이용에 동의합니다.
              </span>
            </div>
            <button className='text-gray-500 text-sm underline'>자세히 보기</button>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={terms.privacy2}
                onChange={() => handleTermChange('privacy2')}
                className='mr-2 w-5 h-5 accent-orange-500 flex-shrink-0'
              />
              <span>
                <span className='text-red-500'>(필수)</span> 개인정보 제3자 제공에 동의합니다.
              </span>
            </div>
            <button className='text-gray-500 text-sm underline'>자세히 보기</button>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={terms.marketing}
                onChange={() => handleTermChange('marketing')}
                className='mr-2 w-5 h-5 accent-orange-500 flex-shrink-0'
              />
              <span>
                <span className='text-gray-500'>(선택)</span> 마케팅 정보 수신에 동의합니다.
              </span>
            </div>
            <button className='text-gray-500 text-sm underline'>자세히 보기</button>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white '>
        <button
          onClick={onNext}
          disabled={!isAllRequired}
          className={`w-full py-4 rounded-lg ${
            isAllRequired
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
