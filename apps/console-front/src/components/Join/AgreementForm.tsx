import Link from 'next/link';

import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Controller, Control, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import type { UserType } from '@/repository/auth-repository';

interface AgreementItem {
  name: keyof UserType;
  label: string;
  link: string;
  required: boolean;
}

interface AgreementCheckBoxProps {
  name: keyof UserType;
  label: string;
  link: string;
  control: Control<UserType>;
}

interface AgreementCheckBoxGroupProps {
  control: Control<UserType>;
  setValue: UseFormSetValue<UserType>;
  watch: UseFormWatch<UserType>;
}

const AgreementCheckBox = ({ name, label, link, control }: AgreementCheckBoxProps) => (
  <Box>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          id={`${name}-label`}
          control={
            <Checkbox
              checked={field.value === true}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          sx={{
            display: 'flex',
            margin: 0,

            '& .MuiFormControlLabel-label': {
              width: '100%',
            },
          }}
          label={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box component='span' sx={{ color: '#999999' }}>
                {label}
              </Box>
              <Link
                href={link}
                style={{
                  textDecoration: 'underline',
                  whiteSpace: 'nowrap',
                  color: '#999999',
                }}
              >
                자세히
              </Link>
            </Box>
          }
        />
      )}
    />
  </Box>
);

const AgreementCheckBoxGroup = ({ control }: AgreementCheckBoxGroupProps) => {
  const agreements: AgreementItem[] = [
    {
      name: 'isTermsAgree',
      label: '[필수] 서비스 이용약관에 동의합니다.',
      link: 'https://www.naver.com/terms',
      required: true,
    },
    {
      name: 'isPrivacyAgree',
      label: '[필수] 개인정보 수집 및 이용약관에 동의합니다.',
      link: 'https://www.naver.com/privacy',
      required: true,
    },
    {
      name: 'isMarketingAgree',
      label: '[선택] 이벤트 및 마케팅 수신에 동의합니다.',
      link: 'https://www.naver.com/marketing',
      required: false,
    },
  ];

  return (
    <Box sx={{ p: 2, color: '#999999', pt: 0 }}>
      <FormGroup>
        {agreements.map((agreement) => (
          <AgreementCheckBox
            key={agreement.name}
            name={agreement.name}
            label={agreement.label}
            link={agreement.link}
            control={control}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default AgreementCheckBoxGroup;
