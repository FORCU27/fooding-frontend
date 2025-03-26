'use client';

import { Application } from '@/repository/application-repository';
import { projectRepository } from '@/repository/project-repository';
import styled from '@emotion/styled';
import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

const PlatformEnum = {
  ANDROID: 'Android',
  IOS: 'Ios',
  WEB: 'Web',
  DESKTOP: 'Desktop',
};

interface Filters {
  search: string;
}

export interface FormProps {
  className?: string;
  editOriginValue?: Application;
  handleBackClick: () => void;
  handleSubmit: (data: Application) => void;
}

const ApplicationForm = (props: PropsWithoutRef<FormProps>) => {
  const [filters, setFilters] = useState<Filters>({ search: '' });
  const { className, editOriginValue, handleBackClick, handleSubmit } = props;
  const isUpdateMode = useMemo(() => !!editOriginValue, [editOriginValue]);
  const {
    register,
    setValue,
    watch,
    handleSubmit: onSubmit,
  } = useForm<Application>({
    mode: 'onSubmit',
    defaultValues: {
      projectId: editOriginValue?.projectId,
      name: editOriginValue?.name,
      platform: editOriginValue?.platform,
    },
  });

  const { data: projects } = useSWR(['projects', filters], () =>
    projectRepository.getList({ search: filters.search }),
  );

  const platformValue = watch('platform');
  const projectValue = watch('projectId');

  return (
    <FormWrapper onSubmit={onSubmit(handleSubmit)} className={className}>
      <div className='application-form__wrapper'>
        <div className='application-form__content'>
          <h1 className='application-form__content__title'>{`앱 ${isUpdateMode ? '수정 ' : '등록 '}`}</h1>
          <InputLabel htmlFor='name' className='application-form__content__label' required>
            앱명
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='application-form__content__input'
            {...register('name')}
            placeholder='앱명을 입력해주세요.'
            multiline
            required
          />

          <Box sx={{ p: 2 }}>
            <InputLabel htmlFor='projectId' className='application-form__content__label' required>
              프로젝트
            </InputLabel>
            <Select
              label='projectId'
              className='application-form__content__input'
              sx={{ width: '100%' }}
              {...register('projectId')}
              value={projectValue ?? ''}
            >
              {projects?.data.map((project, index) => {
                return (
                  <MenuItem value={project.id} key={index}>
                    {project.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box sx={{ p: 2 }}>
            <InputLabel htmlFor='platform' className='application-form__content__label' required>
              플랫폼
            </InputLabel>
            <Select
              label='platform'
              className='application-form__content__input'
              sx={{ width: '100%' }}
              {...register('platform')}
              value={platformValue ?? PlatformEnum.ANDROID}
            >
              <MenuItem value={PlatformEnum.ANDROID}>Android</MenuItem>
              <MenuItem value={PlatformEnum.IOS}>Ios</MenuItem>
              <MenuItem value={PlatformEnum.WEB}>Web</MenuItem>
              <MenuItem value={PlatformEnum.DESKTOP}>Desktop</MenuItem>
            </Select>
          </Box>
          <div className='application-form__button-container'>
            <Button
              size='large'
              variant='outlined'
              onClick={handleBackClick}
              className='application-form__cancel-button'
            >
              취소
            </Button>
            <Button
              size='large'
              variant='contained'
              type='submit'
              className='application-form__submit-button'
            >
              {isUpdateMode ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ApplicationForm;

const FormWrapper = styled.form`
  .application-form__wrapper {
    display: flex;
    flex-direction: column;

    .application-form__content {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0 24px;
      @media only screen and (max-width: 600px) {
        padding: 16px;
      }

      .application-form__content__title {
        padding: 24px 16px;
        font-size: 48px;
        font-weight: 800;

        @media only screen and (max-width: 600px) {
          padding: 16px;
          font-size: 32px;
        }
      }
      .application-form__content__label {
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
      .application-form__content__input {
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
      .application-form__button-container {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 52px;
        margin-bottom: 50px;

        button {
          width: 250px;
        }

        .application-form__submit-button:hover {
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
