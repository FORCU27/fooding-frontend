import { ArrowLeftIcon, IconProps } from '@repo/design-system/icons';

type CheckedKeys = 'termsAgreed' | 'privacyPolicyAgreed' | 'thirdPartyAgreed' | 'marketingConsent';

type Term = {
  key: CheckedKeys;
  label: string;
  required: boolean;
};

interface TermsAgreementProps {
  onClose: (value: React.SetStateAction<boolean>) => void;
  formData: Record<CheckedKeys, boolean>;
  updateFormData: (value: Record<CheckedKeys, boolean>) => void;
}

const TermsAgreement = ({ onClose, formData, updateFormData }: TermsAgreementProps) => {
  const terms: Term[] = [
    { key: 'termsAgreed', label: '서비스 이용약관 동의', required: true },
    { key: 'privacyPolicyAgreed', label: '개인정보 수집 및 이용 동의', required: true },
    { key: 'thirdPartyAgreed', label: '개인정보 제3자 제공 동의', required: true },
    { key: 'marketingConsent', label: '마케팅 정보 수신 동의', required: false },
  ];

  const toggleCheck = (key: CheckedKeys) => {
    updateFormData({ ...formData, [key]: !formData[key] });
  };

  const allAgreed = terms.every((term) => formData[term.key]);

  const toggleAll = () => {
    const newValue = !allAgreed;
    const updated = terms.reduce(
      (acc, t) => {
        acc[t.key] = newValue;
        return acc;
      },
      {} as Record<CheckedKeys, boolean>,
    );
    updateFormData(updated);
  };

  const isAllRequiredAgreed = terms.filter((t) => t.required).every((t) => formData[t.key]);

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
          <TermsCheckIcon variant={allAgreed ? 'default' : 'disabled'} />
        </button>

        <ul className='px-[40px] pt-[10px]'>
          {terms.map((term) => (
            <li key={term.key} className='flex justify-between items-center pt-[30px]'>
              <label className='flex gap-[8px] items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={formData[term.key]}
                  onChange={() => toggleCheck(term.key)}
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
                onClick={() => toggleCheck(term.key)}
                className='cursor-pointer'
                role='checkbox'
                aria-checked={formData[term.key]}
                tabIndex={0}
              >
                <TermsCheckIcon variant={formData[term.key] ? 'default' : 'disabled'} />
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

interface TermsCheckIconProps extends IconProps {
  sizeMode?: 'medium' | 'large';
  variant: 'default' | 'pressed' | 'disabled';
}

function TermsCheckIcon({ sizeMode = 'large', variant, ...props }: TermsCheckIconProps) {
  const getSvg = () => {
    if (sizeMode === 'medium') {
      const circleFill =
        variant === 'default' ? '#FF2B3D' : variant === 'pressed' ? '#C32230' : '#D9D9D9';

      return (
        <svg
          width='25'
          height='25'
          viewBox='0 0 25 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
        >
          <circle cx='12.5' cy='12.5' r='12.5' fill={circleFill} />
          <path
            d='M18.1693 9.25L10.3776 17.0417L6.83594 13.5'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    } else {
      const circleFill =
        variant === 'default' ? '#FF2B3D' : variant === 'pressed' ? '#C32230' : '#D9D9D9';

      return (
        <svg
          width='34'
          height='34'
          viewBox='0 0 34 34'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          {...props}
        >
          <circle cx='17' cy='17' r='17' fill={circleFill} />
          <path
            d='M24.5642 12.2891L14.1753 22.678L9.45312 17.9557'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      );
    }
  };

  return getSvg();
}

export default TermsAgreement;
