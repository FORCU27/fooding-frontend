import { PropsWithoutRef, useState } from 'react';

import styled from '@emotion/styled';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { UserType } from '@/repository/auth-repository';

export interface FormProps {
  handleSubmit: (data: UserType) => void;
  className?: string;
}

const ResetPasswordForm = (props: PropsWithoutRef<FormProps>) => {
  const { handleSubmit, className } = props;

  const {
    watch,
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<UserType>({
    mode: 'onSubmit',
  });

  const password = watch('password');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);

  const validatePassword = (value: string) => {
    const lengthValid = value.length >= 6 && value.length <= 20;
    const hasLetters = /[a-zA-Z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const combinationCount = [hasLetters, hasNumbers, hasSpecial].filter(Boolean).length;

    if (!lengthValid) return '비밀번호는 6~20자 사이여야 합니다.';
    if (combinationCount < 2) return '영문, 숫자, 특수문자 중 2가지 이상을 조합해주세요.';
    return true;
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setPasswordConfirmError(
      !value
        ? '비밀번호 확인은 필수입니다.'
        : value !== password
          ? '비밀번호가 일치하지 않습니다.'
          : null,
    );
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((prev) => !prev);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onSubmitHandler = (data: UserType) => {
    if (passwordConfirmError) {
      return; // 검증 실패 시 제출 방지
    }
    handleSubmit(data); // 검증 통과 시 데이터 제출
  };

  return (
    <FormWrapper onSubmit={onSubmit(onSubmitHandler)} className={className} noValidate>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          mt: 3,
          mb: 3,
        }}
      >
        <Box sx={{ mt: 2, mb: 2 }}>
          <InputLabel sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>새로운 비밀번호</InputLabel>
          <TextField
            required
            autoFocus
            fullWidth
            size='medium'
            type={showPassword ? 'text' : 'password'}
            placeholder='영문, 숫자, 특수문자 중 2가지 이상 조합 (6~20자)'
            sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': { border: 'none' },
            }}
            {...register('password', {
              required: '비밀번호는 필수입니다.',
              validate: validatePassword,
            })}
            error={!!errors.password}
            helperText={null}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                    sx={{ color: '#999999' }}
                  >
                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password && (
            <FormHelperText component='div' error sx={{ color: '#EC2323', mt: 1 }}>
              <Alert severity='error' sx={{ backgroundColor: 'transparent', color: '#EC2323' }}>
                {errors.password?.message}
              </Alert>
            </FormHelperText>
          )}
        </Box>
        <Box sx={{ mt: 2, mb: 2 }}>
          <InputLabel sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>비밀번호 확인</InputLabel>
          <TextField
            required
            fullWidth
            autoFocus
            size='medium'
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder='비밀번호를 다시 입력해주세요.'
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            sx={{
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': { border: 'none' },
            }}
            error={!!passwordConfirmError}
            helperText={null}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password confirmation visibility'
                    onClick={handleClickShowPasswordConfirm}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                    sx={{ color: '#999999' }}
                  >
                    {showPasswordConfirm ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordConfirmError && (
            <FormHelperText component='div' error sx={{ color: '#EC2323', mt: 1 }}>
              <Alert severity='error' sx={{ backgroundColor: 'transparent', color: '#EC2323' }}>
                {passwordConfirmError}
              </Alert>
            </FormHelperText>
          )}
        </Box>

        <Button
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          disableElevation
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: '#FF4938',
            color: '#ffffff',
            fontWeight: 800,
            height: '56px',
          }}
        >
          비밀번호 변경
        </Button>
      </Box>
    </FormWrapper>
  );
};

export default ResetPasswordForm;

const FormWrapper = styled.form`
  height: 100%;
  overflow-y: auto;
`;
