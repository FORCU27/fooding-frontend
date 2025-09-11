import Link from 'next/link';

import { Checkbox } from '@repo/design-system/components/b2c';
import { Controller, Control, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { StoreWaitingFormData } from './StoreWaitingForm';

interface AgreementItem {
  name: keyof StoreWaitingFormData;
  label: string;
  link: string;
  required: boolean;
}

interface AgreementCheckBoxProps {
  name: keyof StoreWaitingFormData;
  label: string;
  link: string;
  control: Control<StoreWaitingFormData>;
  className?: string;
}

interface AgreementCheckBoxGroupProps {
  control: Control<StoreWaitingFormData>;
  setValue: UseFormSetValue<StoreWaitingFormData>;
  watch: UseFormWatch<StoreWaitingFormData>;
  className?: string;
}

const AgreementCheckBox = ({ name, label, link, control, className }: AgreementCheckBoxProps) => (
  <div className={`w-full flex flex-col my-2 gap-2 ${className}`}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox.Label htmlFor={`${name}-label`}>
          <Checkbox
            id={`${name}-label`}
            checked={field.value === true}
            className='min-w-5'
            onChange={(checked) => field.onChange(checked)}
          />
          <div className='flex justify-between items-center w-full subtitle-6 gap-2'>
            <Checkbox.LabelText className='truncate text-gray-6'>{label}</Checkbox.LabelText>
            <Link
              href={link}
              className='underline whitespace-nowrap text-gray-6'
              target='_blank'
              rel='noopener noreferrer'
            >
              자세히
            </Link>
          </div>
        </Checkbox.Label>
      )}
    />
  </div>
);

const StoreWaitingAgreementCheckBoxGroup = ({
  control,
  className,
}: AgreementCheckBoxGroupProps) => {
  const agreements: AgreementItem[] = [
    {
      name: 'termsAgreed',
      label: '[필수] 서비스 이용약관에 동의합니다.',
      link: 'https://www.naver.com/terms',
      required: true,
    },
    {
      name: 'privacyPolicyAgreed',
      label: '[필수] 개인정보 수집 및 이용약관에 동의합니다.',
      link: 'https://www.naver.com/privacy',
      required: true,
    },
    {
      name: 'thirdPartyAgreed',
      label: '[필수] 서드 파티 쿠키를 사용하도록 동의합니다.',
      link: 'https://www.naver.com/marketing',
      required: true,
    },
  ];

  return (
    <div className='flex flex-col w-full'>
      {agreements.map((agreement) => (
        <AgreementCheckBox
          key={agreement.name}
          name={agreement.name}
          label={agreement.label}
          link={agreement.link}
          control={control}
          className={className}
        />
      ))}
    </div>
  );
};

export default StoreWaitingAgreementCheckBoxGroup;
