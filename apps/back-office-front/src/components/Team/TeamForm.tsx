'use client';

import { PropsWithoutRef, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { Button, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Team } from '@/repository/team-repository';

export interface FormProps {
  className?: string;
  editOriginValue?: Team;
  handleBackClick: () => void;
  handleSubmit: (data: Team) => void;
}

const TeamForm = (props: PropsWithoutRef<FormProps>) => {
  const { className, editOriginValue, handleBackClick, handleSubmit } = props;
  const isUpdateMode = useMemo(() => !!editOriginValue, [editOriginValue]);

  const {
    register,
    setValue,
    watch,
    handleSubmit: onSubmit,
  } = useForm<Team>({
    mode: 'onSubmit',
    defaultValues: {
      name: editOriginValue?.name || ''
    },
  });

  return (
    <FormWrapper onSubmit={onSubmit(handleSubmit)} className={className}>
      <div className='team-form__wrapper'>
        <div className='team-form__content'>
          <h1 className='team-form__content__title'>{`팀 ${isUpdateMode ? '수정 ' : '등록 '}`}</h1>
          <InputLabel htmlFor='title' className='team-form__content__label' required>
            팀명
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='team-form__content__input'
            {...register('name')}
            placeholder='팀명을 입력해주세요.'
            multiline
            required
          />   
          <div className='team-form__button-container'>
            <Button
              size='large'
              variant='outlined'
              onClick={handleBackClick}
              className='team-form__cancel-button'
            >
              취소
            </Button>
            <Button
              size='large'
              variant='contained'
              type='submit'
              className='team-form__submit-button'
            >
              {isUpdateMode ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default TeamForm;

const FormWrapper = styled.form`
  .team-form__wrapper {
    display: flex;
    flex-direction: column;

    .team-form__content {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0 24px;
      @media only screen and (max-width: 600px) {
        padding: 16px;
      }

      .team-form__content__title {
        padding: 24px 16px;
        font-size: 48px;
        font-weight: 800;

        @media only screen and (max-width: 600px) {
          padding: 16px;
          font-size: 32px;
        }
      }
      .team-form__content__label {
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
      .team-form__content__input {
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
      }
      .team-form__button-container {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 52px;
        margin-bottom: 50px;

        button {
          width: 250px;
        }

        .team-form__submit-button:hover {
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
  }
`;
