import { useState } from 'react';

import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import {
  Box,
  InputLabel,
  TextField,
  FormHelperText,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';

import { UserType } from '@/repository/auth-repository';

interface PasswordValidateFormProps {
  register: UseFormRegister<UserType>;
  errors: FieldErrors<UserType>;
  watch: UseFormWatch<UserType>;
}

const PasswordValidateForm = ({ register, errors, watch }: PasswordValidateFormProps) => {
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false);
  const { password } = watch();

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

  return (
    <>
      <Box sx={{ p: 2 }}>
        <InputLabel required sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
          비밀번호
        </InputLabel>
        <TextField
          required
          fullWidth
          autoFocus
          size='medium'
          type={showPassword ? 'text' : 'password'}
          placeholder='영문, 숫자, 특수문자 중 2가지 이상 조합 (6~20자)'
          sx={{
            height: '48px',
            borderRadius: '8px',
            justifyContent: 'center',
            alignContent: 'center',
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
          <FormHelperText component='div' error sx={{ color: '#EC2323' }}>
            <Alert
              severity='error'
              sx={{ backgroundColor: 'transparent', color: '#EC2323', m: 0, p: 0 }}
            >
              {errors.password?.message}
            </Alert>
          </FormHelperText>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <InputLabel required sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>
          비밀번호 확인
        </InputLabel>
        <TextField
          required
          fullWidth
          autoFocus
          size='medium'
          type={showPasswordConfirm ? 'text' : 'password'}
          placeholder='비밀번호를 다시 한번 입력해주세요.'
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          sx={{
            height: '48px',
            borderRadius: '8px',
            justifyContent: 'center',
            alignContent: 'center',
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
          <FormHelperText component='div' error sx={{ color: '#EC2323' }}>
            <Alert
              severity='error'
              sx={{ backgroundColor: 'transparent', color: '#EC2323', m: 0, p: 0 }}
            >
              {passwordConfirmError}
            </Alert>
          </FormHelperText>
        )}
      </Box>
    </>
  );
};

export default PasswordValidateForm;
