'use client';

import React, { PropsWithoutRef, useMemo } from 'react';

import styled from '@emotion/styled';
import { Button, InputAdornment, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Client } from '@/repository/client-repository';

export interface FormProps {
  className?: string;
  editOriginValue?: Client;
  handleBackClick: () => void;
  handleSubmit: (data: Client) => void;
}

const ClientForm = (props: PropsWithoutRef<FormProps>) => {
  const { className, editOriginValue, handleBackClick, handleSubmit } = props;
  const isUpdateMode = useMemo(() => !!editOriginValue, [editOriginValue]);

  const {
    register,
    setValue,
    handleSubmit: onSubmit,
  } = useForm<Client>({
    mode: 'onSubmit',
    defaultValues: {
      projectName: editOriginValue?.projectName || '',
      companyName: editOriginValue?.companyName || '',
      name: editOriginValue?.name || '',
      mobile: editOriginValue?.mobile || '',
      email: editOriginValue?.email || '',
      budget: editOriginValue?.budget || '',
      description: editOriginValue?.description || '',
    },
  });

  /** 전화번호 입력 시 0~9까지의 숫자와 하이픈만 입력되도록 설정함 */
  const phoneNumberFormatter = (value: string) => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 3) return numbers;

    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }

    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const currencyFormatter = (price: string): string => {
    /** 기존 쉼표를 제거하고, 숫자만 남긴 후 다시 포맷 적용 */
    return price.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = phoneNumberFormatter(e.target.value);
    setValue('mobile', value);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = currencyFormatter(e.target.value);
    setValue('budget', value);
  };

  return (
    <FormWrapper onSubmit={onSubmit(handleSubmit)} className={className}>
      <div className='contact-form__wrapper'>
        <div className='contact-form__content'>
          <h1 className='contact-form__content__title'>견적문의 수정</h1>
          <InputLabel htmlFor='projectName' className='contact-form__content__label' required>
            프로젝트 이름
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='contact-form__content__input'
            placeholder='프로젝트 이름을 입력해주세요.'
            {...register('projectName')}
            required
          />
          <InputLabel htmlFor='companyName' className='contact-form__content__label' required>
            회사명
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='contact-form__content__input'
            {...register('companyName')}
            placeholder='회사명을 입력해주세요.'
            required
          />
          <InputLabel htmlFor='name' className='contact-form__content__label' required>
            성함
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='contact-form__content__input'
            {...register('name')}
            placeholder='성함을 입력해주세요.'
            required
          />
          <InputLabel htmlFor='email' className='contact-form__content__label' required>
            이메일
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='contact-form__content__input'
            {...register('email')}
            placeholder='이메일을 입력해주세요.'
            type='email'
            required
          />
          <InputLabel htmlFor='mobile' className='contact-form__content__label' required>
            연락처
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='contact-form__content__input'
            {...register('mobile')}
            onChange={handleMobileChange}
            placeholder='연락처를 입력해주세요.'
            type='tel'
            required
          />
          <InputLabel htmlFor='budget' className='contact-form__content__label'>
            예산
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            slotProps={{
              input: {
                endAdornment: <InputAdornment position='end'>원</InputAdornment>,
              },
            }}
            className='contact-form__content__input'
            {...register('budget')}
            onChange={handleBudgetChange}
            placeholder='대략적인 예산을 입력해주세요.'
          />
          <InputLabel htmlFor='description' className='contact-form__content__label'>
            프로젝트 내용
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='contact-form__content__input'
            {...register('description')}
            placeholder='프로젝트 내용을 입력해주세요.'
            multiline
          />
          <div className='contact-form__button-container'>
            <Button
              size='large'
              variant='outlined'
              onClick={handleBackClick}
              className='contact-form__cancel-button'
            >
              취소
            </Button>
            <Button
              size='large'
              variant='contained'
              type='submit'
              className='contact-form__submit-button'
            >
              {isUpdateMode ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ClientForm;

const FormWrapper = styled.form`
  .contact-form__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    .contact-form__content {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0 24px;

      @media only screen and (max-width: 600px) {
        padding: 0 16px;
      }

      .contact-form__content__title {
        padding: 24px 16px;
        font-size: 48px;
        font-weight: 800;

        @media only screen and (max-width: 600px) {
          padding: 16px;
          font-size: 32px;
        }
      }
      .contact-form__content__label {
        padding: 0 16px;
        margin-bottom: 4px;
        font-size: 18px;
        font-weight: 600;
        color: black;

        .MuiInputLabel-asterisk {
          font-size: 20px;
          color: red;
          font-weight: 400;
        }
      }
      .contact-form__content__input {
        padding: 0 16px;
        background-color: white;
        border-radius: 8px;
        margin-bottom: 38px;
        font-size: 16px;

        input {
          height: 48px;
          padding: 0 1rem;
          font-family: 'Pretendard';
        }

        textarea {
          font-family: 'Pretendard';
          font-size: 16px;
          height: 300px;
          margin-bottom: 30px;
        }
      }

      .contact-form__content__input:last-child {
        margin-bottom: 100px;
      }
    }

    .contact-form__button-container {
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 52px;
      margin-bottom: 50px;

      button {
        width: 250px;
      }

      .contact-form__submit-button:hover {
        background-color: #3c52b2;
      }

      @media only screen and (max-width: 600px) {
        width: 100%;
        gap: 16px;
        margin-top: 16px;

        button {
          width: 80px;
        }
      }
    }
  }
`;
