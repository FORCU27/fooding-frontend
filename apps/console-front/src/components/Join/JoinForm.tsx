import { PropsWithoutRef, useState } from 'react';

import styled from '@emotion/styled';
import { Alert, Button, Snackbar } from '@mui/material';
import { useForm } from 'react-hook-form';

import AgreementCheckBoxGroup from './AgreementForm';
import EmailValidateForm from './EmailValidateForm';
import JoinPathForm from './JoinPathForm';
import NicknameValidateForm from './NicknameValidateForm';
import PasswordValidateForm from './PasswordValidateForm';
import { UserType } from '@/repository/auth-repository';

export interface FormProps {
  handleSubmit: (data: UserType) => void;
  className?: string;
}

interface ValidationMessage {
  message: string | null;
  isValid: boolean | null;
}

const JoinForm = (props: PropsWithoutRef<FormProps>) => {
  const { handleSubmit, className } = props;
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const {
    register,
    handleSubmit: onSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserType>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      isTermsAgree: false,
      isPrivacyAgree: false,
      isMarketingAgree: false,
      joinPath: 'EMPTY',
    },
  });

  const [emailValidation, setEmailValidation] = useState<ValidationMessage>({
    message: null,
    isValid: false,
  });
  const [nicknameValidation, setNicknameValidation] = useState<ValidationMessage>({
    message: null,
    isValid: false,
  });
  const [isEmailFullyValidated, setIsEmailFullyValidated] = useState<boolean>(false);

  const onSubmitHandler = (data: UserType) => {
    if (!isEmailFullyValidated) {
      setNotification({
        open: true,
        message: '이메일 인증을 완료해주세요.',
        severity: 'error',
      });
      return;
    }
    if (!nicknameValidation.isValid) {
      setNotification({
        open: true,
        message: '닉네임 중복 확인을 완료해주세요.',
        severity: 'error',
      });
      return;
    }
    if (data.isTermsAgree !== true || data.isPrivacyAgree !== true) {
      setNotification({
        open: true,
        message: '필수 약관에 동의해야 회원가입이 가능합니다.',
        severity: 'error',
      });
      return;
    }
    handleSubmit(data);
  };

  const handleCloseSnackbar = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <FormWrapper
      onSubmit={onSubmit(onSubmitHandler)}
      className={className}
      style={{ padding: 3 }}
      noValidate
    >
      <EmailValidateForm
        register={register}
        errors={errors}
        watch={watch}
        emailValidation={emailValidation}
        setEmailValidation={setEmailValidation}
        onValidationChange={setIsEmailFullyValidated}
      />
      <PasswordValidateForm register={register} errors={errors} watch={watch} />
      <NicknameValidateForm
        register={register}
        errors={errors}
        watch={watch}
        nicknameValidation={nicknameValidation}
        setNicknameValidation={setNicknameValidation}
      />
      <JoinPathForm register={register} watch={watch} />
      <AgreementCheckBoxGroup control={control} setValue={setValue} watch={watch} />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        size='large'
        disableElevation
        sx={{
          mt: 3,
          mb: 2,
          height: '56px',
          backgroundColor: '#FF4938',
          color: '#ffffff',
          fontWeight: 800,
        }}
      >
        회원가입
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notification.open}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          variant='filled'
          sx={{ width: '100%', color: '#FFFFFF' }}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </FormWrapper>
  );
};

export default JoinForm;

const FormWrapper = styled.form`
  height: 100%;
`;
