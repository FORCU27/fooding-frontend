import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Box,
  InputLabel,
  TextField,
  Button,
  FormHelperText,
  Alert,
  InputAdornment,
} from '@mui/material';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { UserType } from '@/repository/auth-repository';

enum VerificationType {
  IDENTITY_VERIFICATION = 'identityVerification',
  PASSWORD_CHANGE = 'passwordChange',
  PASSWORD_RESET = 'passwordReset',
}

enum VerificationMethod {
  MAIL = 'MAIL',
}

interface ValidationMessage {
  message: string | null;
  isValid: boolean | null;
}

interface EmailValidateFormProps {
  register: UseFormRegister<UserType>;
  errors: FieldErrors<UserType>;
  watch: UseFormWatch<UserType>;
  emailValidation: ValidationMessage;
  setEmailValidation: React.Dispatch<React.SetStateAction<ValidationMessage>>;
  onValidationChange: (isValid: boolean) => void;
}

const EmailValidateForm = ({
  register,
  errors,
  watch,
  emailValidation,
  setEmailValidation,
  onValidationChange,
}: EmailValidateFormProps) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationCodeValidation, setVerificationCodeValidation] = useState<ValidationMessage>({
    message: null,
    isValid: null,
  });

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [requireButton, setRequireButton] = useState<'인증요청' | '재발송'>('인증요청');
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);
  const [lastValidatedEmail, setLastValidatedEmail] = useState<string | null>(null);
  const { email } = watch();

  const initialValidation: ValidationMessage = useMemo(
    () => ({ message: null, isValid: null }),
    [],
  );

  const isFullyValidated = useMemo(() => {
    return emailValidation.isValid === true && verificationCodeValidation.isValid === true;
  }, [emailValidation.isValid, verificationCodeValidation.isValid]);

  useEffect(() => {
    onValidationChange(isFullyValidated);
  }, [isFullyValidated, onValidationChange]);

  const validateEmail = useCallback(
    async (email: string) => {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      setVerificationCodeValidation(initialValidation); // 인증요청 시 초기화
      setIsTimerRunning(false);
      setTimer(0);
      setIsReadOnly(false);

      if (!email || !emailPattern.test(email)) {
        setEmailValidation({ message: '이메일 형식이 올바르지 않아요.', isValid: false });
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destination: email,
            verificationType: VerificationType.IDENTITY_VERIFICATION,
            method: VerificationMethod.MAIL,
          }),
        });

        const result = await response.json();

        if (result.message.error) {
          setEmailValidation({
            message: result.message.message,
            isValid: false,
          });
        } else {
          setEmailValidation({
            message: '인증번호가 전송되었습니다. 인증번호를 입력해주세요.',
            isValid: true,
          });
          setLastValidatedEmail(email);
          setVerificationCode('');
          setIsTimerRunning(true); // 인증 성공 시 타이머 시작
          setTimer(300); // 5분 = 300초
          setIsReadOnly(false);
          setRequireButton('재발송');
        }
      } catch (error) {
        const errorMessage = '서버 내부 오류';
        console.error('API 요청 처리 중 오류 발생:', error);
        setEmailValidation({
          message: errorMessage,
          isValid: false,
        });
      }
    },
    [initialValidation, setEmailValidation],
  );

  const handleCheckValidateEmailClick = useCallback(
    async (email: string, code: string) => {
      if (!code) {
        setVerificationCodeValidation({
          message: '유효하지 않은 요청입니다. 다시 시도해주세요.',
          isValid: false,
        });
        setEmailValidation((prev) => ({
          ...prev,
          isValid: null,
        }));
        setIsReadOnly(true);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verifications/confirm`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              destination: email,
              verificationCode: code,
            }),
          },
        );

        const result = await response.json();

        if (result.message.statusCode === 400) {
          setVerificationCodeValidation({
            message: result.message.message,
            isValid: false,
          });
          setEmailValidation({
            message: null,
            isValid: false,
          });

          if (result.message.message === '최대 시도 횟수를 초과했습니다.') {
            setRequireButton('재발송');
            setIsTimerRunning(false); // 타이머 비활성화
            setTimer(0); // 타이머 초기화
            setIsReadOnly(false); // 인증번호 입력 필드 활성화
            setEmailValidation({
              message: '최대 시도 횟수를 초과했습니다. 재발송 버튼을 눌러 다시 시도해주세요.',
              isValid: false,
            });
            setVerificationCodeValidation({
              message: null,
              isValid: null,
            });
            return;
          }
        } else {
          setIsTimerRunning(false);
          setRequireButton('재발송');
          setIsReadOnly(true);
          setVerificationCodeValidation({
            message: '인증이 완료되었습니다.',
            isValid: true,
          });
          setEmailValidation((prev) => ({
            ...prev,
            message: '이메일 인증이 완료되었습니다.',
            isValid: true,
          }));
        }
      } catch (error) {
        const errorMessage = '서버 내부 오류';
        console.error('API 요청 처리 중 오류 발생:', error);
        setVerificationCodeValidation({
          message: errorMessage,
          isValid: false,
        });
        setEmailValidation((prev) => ({
          ...prev,
          isValid: false,
        }));
      }
    },
    [setEmailValidation],
  );

  const handleVerificationCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isReadOnly) {
        setVerificationCode(e.target.value);

        if (e.target.value) {
          setVerificationCodeValidation({
            message: '인증확인을 완료해주세요.',
            isValid: false,
          });
        } else {
          setVerificationCodeValidation({ message: null, isValid: null });
        }
      }
    },
    [isReadOnly],
  );

  // 이메일 값이 변경될 때 상태 초기화
  useEffect(() => {
    if (email !== lastValidatedEmail && (emailValidation.isValid || isTimerRunning)) {
      setIsReadOnly(false);
      setEmailValidation(initialValidation);
      setVerificationCodeValidation(initialValidation);
      setVerificationCode('');
      setIsTimerRunning(false);
      setTimer(0);
      setRequireButton('인증요청'); // 이메일 변경 시 초기 상태로
    }
    if (!email) {
      setIsReadOnly(false);
      setEmailValidation(initialValidation);
      setVerificationCodeValidation(initialValidation);
      setVerificationCode('');
      setIsTimerRunning(false);
      setTimer(0);
      setLastValidatedEmail(null);
      setRequireButton('인증요청');
    }
  }, [
    email,
    lastValidatedEmail,
    emailValidation.isValid,
    isTimerRunning,
    setEmailValidation,
    initialValidation,
  ]);

  // 타이머 관리
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false); // 타이머 종료
      setVerificationCodeValidation({
        message: '입력시간이 초과되었습니다. 재발송 버튼을 눌러주세요.',
        isValid: false,
      });
      setEmailValidation((prev) => ({
        ...prev,
        message: '인증 유효 시간이 만료되었습니다.',
        isValid: false,
      }));
      setIsReadOnly(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, setEmailValidation]);

  // 타이머 포맷 (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box component='div' sx={{ p: 2 }}>
        <InputLabel required sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
          이메일
        </InputLabel>
        <Box component='div' sx={{ display: 'flex', width: '100%' }}>
          <TextField
            required
            autoFocus
            size='small'
            type='email'
            sx={{
              mr: 2,
              width: '75%',
              borderRadius: '8px',
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': { border: 'none' },
            }}
            {...register('email', {
              required: '이메일은 필수입니다.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식이 올바르지 않아요.',
              },
            })}
            placeholder='이메일을 입력해주세요.'
            value={email}
            error={!!errors.email || (!!emailValidation.isValid && !emailValidation.isValid)}
            helperText={null}
          />
          <Button
            variant='contained'
            size='small'
            onClick={() => validateEmail(email)}
            disabled={!email || (isTimerRunning && timer > 0)}
            sx={{ background: '#FFFFFF', height: '48px', width: '22%', fontWeight: 700 }}
          >
            {requireButton}
          </Button>
        </Box>

        {!emailValidation.isValid && emailValidation.message && (
          <FormHelperText component='div' error sx={{ color: '#EC2323', m: 0, p: 0 }}>
            <Alert
              severity='error'
              sx={{ backgroundColor: 'transparent', color: '#EC2323', m: 0, p: 0 }}
            >
              {emailValidation.message}
            </Alert>
          </FormHelperText>
        )}
        {!isFullyValidated && emailValidation.isValid && emailValidation.message && (
          <FormHelperText component='div'>
            <Alert
              severity='info'
              color='success'
              sx={{ backgroundColor: 'transparent', m: 0, p: 0 }}
            >
              {emailValidation.message}
            </Alert>
          </FormHelperText>
        )}
        {isFullyValidated && emailValidation.message && (
          <FormHelperText component='div'>
            <Alert severity='success' sx={{ backgroundColor: 'transparent', m: 0, p: 0 }}>
              {emailValidation.message}
            </Alert>
          </FormHelperText>
        )}
      </Box>

      <Box component='div' sx={{ p: 2 }}>
        <InputLabel required sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
          인증번호 입력
        </InputLabel>
        <Box component='div' sx={{ display: 'flex', width: '100%' }}>
          <TextField
            required
            autoFocus
            size='small'
            type='text'
            placeholder='인증번호를 입력해주세요.'
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            sx={{
              mr: 2,
              width: '75%',
              borderRadius: '8px',
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': { border: 'none' },
            }}
            error={!!verificationCodeValidation.isValid && !verificationCodeValidation.isValid}
            helperText={null}
            disabled={isReadOnly}
            InputProps={{
              endAdornment: isTimerRunning && timer > 0 && (
                <InputAdornment position='end'>
                  <span style={{ color: '#999999', fontSize: '14px' }}>{formatTime(timer)}</span>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant='contained'
            size='small'
            onClick={() => handleCheckValidateEmailClick(email, verificationCode)}
            disabled={!email || !verificationCode || isReadOnly}
            sx={{ background: '#FFFFFF', height: '48px', width: '22%', fontWeight: 700 }}
          >
            인증확인
          </Button>
        </Box>
        {verificationCodeValidation.message && !verificationCodeValidation.isValid && (
          <FormHelperText component='div' error sx={{ color: '#EC2323', m: 0, p: 0 }}>
            <Alert
              severity='error'
              sx={{ backgroundColor: 'transparent', color: '#EC2323', m: 0, p: 0 }}
            >
              {verificationCodeValidation.message}
            </Alert>
          </FormHelperText>
        )}
        {verificationCodeValidation.isValid && verificationCodeValidation.message && (
          <FormHelperText component='div' sx={{ mt: 1 }}>
            <Alert severity='success' sx={{ backgroundColor: 'transparent', m: 0, p: 0 }}>
              {verificationCodeValidation.message}
            </Alert>
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
};

export default EmailValidateForm;
