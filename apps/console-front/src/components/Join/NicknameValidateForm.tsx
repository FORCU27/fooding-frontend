import { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, InputLabel, TextField, Button, FormHelperText, Alert } from '@mui/material';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';

import { UserType } from '@/repository/auth-repository';

interface ValidationMessage {
  message: string | null;
  isValid: boolean | null;
}

interface NicknameValidateFormProps {
  register: UseFormRegister<UserType>;
  errors: FieldErrors<UserType>;
  watch: UseFormWatch<UserType>;
  nicknameValidation: ValidationMessage;
  setNicknameValidation: React.Dispatch<React.SetStateAction<ValidationMessage>>;
}

const NicknameValidateForm = ({
  register,
  errors,
  watch,
  nicknameValidation,
  setNicknameValidation,
}: NicknameValidateFormProps) => {
  const { nickname } = watch();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [lastValidatedNickname, setLastValidatedNickname] = useState<string | null>(null);

  const validateNickname = useCallback(async () => {
    if (!nickname) {
      setNicknameValidation({ message: '닉네임을 입력해주세요.', isValid: false });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-nickname`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
        }),
      });

      const result = await response.json();

      if (result.isAvailable) {
        setIsReadOnly(true);
        setLastValidatedNickname(nickname);
        setNicknameValidation({
          message: '사용 가능한 닉네임입니다.',
          isValid: true,
        });
      } else {
        setIsReadOnly(false);
        setNicknameValidation({
          message: '이미 사용중인 닉네임입니다.',
          isValid: false,
        });
      }
    } catch (error) {
      const errorMessage = '서버 내부 오류';
      console.error('API 요청 처리 중 오류 발생:', error);
      setNicknameValidation({ message: errorMessage, isValid: false });
      setIsReadOnly(false);
    }
  }, [nickname, setNicknameValidation]);

  const initialValidation: ValidationMessage = useMemo(
    () => ({ message: null, isValid: null }),
    [],
  );

  // 닉네임 값이 변경될 때만 초기화
  useEffect(() => {
    // 닉네임이 변경되고, 마지막으로 검증된 닉네임과 다를 때만 초기화
    if (nickname !== lastValidatedNickname && isReadOnly) {
      setIsReadOnly(false);
      setNicknameValidation(initialValidation);
    }
    // 닉네임이 비어있으면 초기화
    if (!nickname) {
      setIsReadOnly(false);
      setNicknameValidation(initialValidation);
      setLastValidatedNickname(null);
    }
  }, [nickname, lastValidatedNickname, isReadOnly, setNicknameValidation, initialValidation]);

  return (
    <Box component='div' sx={{ p: 2 }}>
      <InputLabel required sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
        닉네임
      </InputLabel>
      <Box component='div' sx={{ display: 'flex', width: '100%' }}>
        <TextField
          required
          autoFocus
          size='small'
          placeholder='닉네임을 입력해주세요.'
          sx={{
            mr: 2,
            width: '75%',
            borderRadius: '8px',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '& fieldset': { border: 'none' },
          }}
          {...register('nickname', {
            required: '닉네임은 필수입니다.',
            minLength: { value: 2, message: '닉네임은 최소 2자 이상이어야 합니다.' },
            maxLength: { value: 10, message: '닉네임은 최대 10자까지입니다.' },
          })}
          error={!!errors.nickname || !nicknameValidation.isValid}
          helperText={null}
        />
        <Button
          variant='contained'
          size='small'
          onClick={validateNickname}
          disabled={!nickname || isReadOnly}
          sx={{ background: '#FFFFFF', height: '48px', width: '22%' }}
        >
          중복확인
        </Button>
      </Box>
      {(errors.nickname || (!nicknameValidation.isValid && nicknameValidation.message)) && (
        <FormHelperText component='div' error sx={{ color: '#EC2323', m: 0, p: 0 }}>
          <Alert
            severity='error'
            sx={{ backgroundColor: 'transparent', color: '#EC2323', m: 0, p: 0 }}
          >
            {errors.nickname?.message || nicknameValidation.message}
          </Alert>
        </FormHelperText>
      )}
      {nicknameValidation.isValid && nicknameValidation.message && (
        <FormHelperText component='div' sx={{ m: 0, p: 0 }}>
          <Alert severity='success' sx={{ backgroundColor: 'transparent', m: 0, p: 0 }}>
            {nicknameValidation.message}
          </Alert>
        </FormHelperText>
      )}
    </Box>
  );
};

export default NicknameValidateForm;
