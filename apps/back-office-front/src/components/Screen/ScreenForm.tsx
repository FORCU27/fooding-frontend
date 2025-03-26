'use client';

import { applicationRepository } from '@/repository/application-repository';
import { Screen } from '@/repository/screen-repository';
import styled from '@emotion/styled';
import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface Filters {
  search: string;
}

export interface FormProps {
  className?: string;
  editOriginValue?: Screen;
  handleBackClick: () => void;
  handleSubmit: (data: Screen) => void;
}

const ScreenForm = (props: PropsWithoutRef<FormProps>) => {
  const [filters, setFilters] = useState<Filters>({ search: '' });
  const { className, editOriginValue, handleBackClick, handleSubmit } = props;
  const isUpdateMode = useMemo(() => !!editOriginValue, [editOriginValue]);
  const {
    register,
    setValue,
    watch,
    handleSubmit: onSubmit,
  } = useForm<Screen>({
    mode: 'onSubmit',
    defaultValues: {
      applicationId: editOriginValue?.applicationId,
      name: editOriginValue?.name,
      url: editOriginValue?.url,
      width: editOriginValue?.width,
      height: editOriginValue?.height,
    },
  });

  const { data: applications } = useSWR(['applications', filters], () =>
    applicationRepository.getList({ search: filters.search }),
  );

  const applicationIdValue = watch('applicationId');

  return (
    <FormWrapper onSubmit={onSubmit(handleSubmit)} className={className}>
      <div className='screen-form__wrapper'>
        <div className='screen-form__content'>
          <h1 className='screen-form__content__title'>{`스크린 ${isUpdateMode ? '수정 ' : '등록 '}`}</h1>
          <Box sx={{ p: 2 }}>
            <InputLabel htmlFor='applicationId' className='screen-form__content__label' required>
              앱
            </InputLabel>
            <Select
              label='applicationId'
              className='screen-form__content__input'
              sx={{ width: '100%' }}
              {...register('applicationId')}
              value={applicationIdValue ?? ''}
            >
              {applications?.data.map((application, index) => {
                return (
                  <MenuItem value={application.id} key={index}>
                    {application.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>

          <InputLabel htmlFor='name' className='screen-form__content__label' required>
            스크린명
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='screen-form__content__input'
            {...register('name')}
            placeholder='스크린명을 입력해주세요.'
            multiline
            required
          />

          <InputLabel htmlFor='url' className='screen-form__content__label' required>
            url
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='screen-form__content__input'
            {...register('url')}
            placeholder='url을 입력해주세요.'
            multiline
            required
          />

          <InputLabel htmlFor='width' className='screen-form__content__label' required>
            width
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='screen-form__content__input'
            {...register('width')}
            placeholder='width을 입력해주세요.'
            multiline
            required
          />

          <InputLabel htmlFor='height' className='screen-form__content__label' required>
            height
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='screen-form__content__input'
            {...register('height')}
            placeholder='height을 입력해주세요.'
            multiline
            required
          />

          <div className='screen-form__button-container'>
            <Button
              size='large'
              variant='outlined'
              onClick={handleBackClick}
              className='screen-form__cancel-button'
            >
              취소
            </Button>
            <Button
              size='large'
              variant='contained'
              type='submit'
              className='screen-form__submit-button'
            >
              {isUpdateMode ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ScreenForm;

const FormWrapper = styled.form`
  .screen-form__wrapper {
    display: flex;
    flex-direction: column;

    .screen-form__content {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0 24px;
      @media only screen and (max-width: 600px) {
        padding: 16px;
      }

      .screen-form__content__title {
        padding: 24px 16px;
        font-size: 48px;
        font-weight: 800;

        @media only screen and (max-width: 600px) {
          padding: 16px;
          font-size: 32px;
        }
      }
      .screen-form__content__label {
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
      .screen-form__content__input {
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
      .screen-form__button-container {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 52px;
        margin-bottom: 50px;

        button {
          width: 250px;
        }

        .screen-form__submit-button:hover {
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
