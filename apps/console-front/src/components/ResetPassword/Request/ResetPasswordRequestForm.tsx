import { PropsWithoutRef } from 'react';

import styled from '@emotion/styled';
import { Alert, Box, Button, FormHelperText, InputLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface FormProps {
  handleSubmit: (email: string) => Promise<void>;
  className?: string;
}

interface FormData {
  email: string;
}

const ResetPasswordRequestForm = (props: PropsWithoutRef<FormProps>) => {
  const { handleSubmit, className } = props;

  const {
    register,
    handleSubmit: onSubmitHandler,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleSubmit(data.email);
  };

  return (
    <FormWrapper onSubmit={onSubmitHandler(onSubmit)} className={className} noValidate>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <InputLabel sx={{ fontWeight: 600, color: '#ffffff', mb: 1 }}>이메일</InputLabel>
        <TextField
          required
          autoFocus
          fullWidth
          size='medium'
          type='email'
          sx={{
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '& fieldset': { border: 'none' },
          }}
          placeholder='이메일 주소를 입력해주세요.'
          {...register('email', {
            required: '이메일은 필수입니다.',
          })}
          error={!!errors.email}
          helperText={null}
        />
        {errors.email && (
          <FormHelperText component='div' error sx={{ color: '#EC2323', mt: 1 }}>
            <Alert severity='error' sx={{ backgroundColor: 'transparent', color: '#EC2323' }}>
              {errors.email?.message}
            </Alert>
          </FormHelperText>
        )}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          disableElevation
          sx={{
            mt: 5,
            mb: 2,
            height: '56px',
            backgroundColor: '#FF4938',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '16px',
          }}
        >
          계속
        </Button>
      </Box>
    </FormWrapper>
  );
};

export default ResetPasswordRequestForm;

const FormWrapper = styled.form`
  height: 100%;
  overflow-y: auto;
`;
