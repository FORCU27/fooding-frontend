import { useState } from 'react';

import { ArrowLeftIcon, CheckIcon } from '@repo/design-system/icons';

type CheckedKeys = 'termsAgreed' | 'privacyPolicyAgreed' | 'thirdPartyAgreed' | 'marketingAgreed';

interface TermsAgreementProps {
  onClose: (value: React.SetStateAction<boolean>) => void;
}

const TermsAgreement = ({ onClose }: TermsAgreementProps) => {
  const [checked, setChecked] = useState<Record<CheckedKeys, boolean>>({
    termsAgreed: false,
    privacyPolicyAgreed: false,
    thirdPartyAgreed: false,
    marketingAgreed: false,
  });

  const terms = [
    { key: 'termsAgreed', label: '서비스 이용약관 동의', required: true },
    { key: 'privacyPolicyAgreed', label: '개인정보 수집 및 이용 동의', required: true },
    { key: 'thirdPartyAgreed', label: '개인정보 제3자 제공 동의', required: true },
    { key: 'marketingAgreed', label: '마케팅 정보 수신 동의', required: false },
  ];

  const toggleCheck = (key: CheckedKeys) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const keys = Object.keys(checked) as CheckedKeys[];

  const allAgreed = keys.every((key) => checked[key]);

  const toggleAll = () => {
    const newValue = !allAgreed;
    const updated: Record<CheckedKeys, boolean> = { ...checked };
    keys.forEach((key) => {
      updated[key] = newValue;
    });
    setChecked(updated);
  };

  const isAllRequiredAgreed = terms
    .filter((t) => t.required)
    .every((t) => checked[t.key as CheckedKeys]);

  const handleSubmit = () => {
    if (!isAllRequiredAgreed) return;
    onClose(false);
  };

  return (
    <main className='flex flex-col items-center relative'>
      <div className='absolute left-[0px] w-[20px] h-screen bg-primary-pink' />
      <header className='py-[58px]'>
        <nav
          className='absolute left-[80px] top-[50px] cursor-pointer z-50'
          onClick={() => onClose(false)}
          aria-label='이전 페이지로 돌아가기'
        >
          <ArrowLeftIcon />
        </nav>
        <h1 className='headline-5 text-center'>이용약관 동의</h1>
      </header>

      <section className='flex flex-col justify-center w-[640px] pt-[50px] relative'>
        <button
          type='button'
          onClick={toggleAll}
          aria-pressed={allAgreed}
          className='rounded-full border-2 border-gray-2 py-[28px] px-[40px] flex items-center justify-between cursor-pointer w-full'
        >
          <span className='subtitle-2-1'>전체 동의</span>
          {allAgreed ? (
            <CheckIcon sizeMode='large' variant='default' />
          ) : (
            <CheckIcon sizeMode='large' variant='disabled' />
          )}
        </button>

        <ul className='px-[40px] pt-[10px]'>
          {terms.map((term) => (
            <li key={term.key} className='flex justify-between items-center pt-[30px]'>
              <label className='flex gap-[8px] items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={checked[term.key as CheckedKeys]}
                  onChange={() => toggleCheck(term.key as CheckedKeys)}
                  className='sr-only'
                  aria-label={`${term.label} ${term.required ? '(필수)' : '(선택)'}`}
                />
                <span className='subtitle-4-1 text-gray-5 underline'>{term.label}</span>
                <span
                  className={
                    term.required ? 'text-red-500 subtitle-4-2' : 'text-gray-500 subtitle-4-1'
                  }
                >
                  ({term.required ? '필수' : '선택'})
                </span>
              </label>
              <div
                onClick={() => toggleCheck(term.key as CheckedKeys)}
                className='cursor-pointer'
                role='checkbox'
                aria-checked={checked[term.key as CheckedKeys]}
                tabIndex={0}
              >
                {checked[term.key as CheckedKeys] ? (
                  <CheckIcon sizeMode='large' variant='default' />
                ) : (
                  <CheckIcon sizeMode='large' variant='disabled' />
                )}
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          disabled={!isAllRequiredAgreed}
          className={`mt-[80px] subtitle-2-2 w-full py-[29px] text-center rounded-full ${isAllRequiredAgreed ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          aria-disabled={!isAllRequiredAgreed}
        >
          동의하기
        </button>
      </section>
    </main>
  );
};

export default TermsAgreement;
