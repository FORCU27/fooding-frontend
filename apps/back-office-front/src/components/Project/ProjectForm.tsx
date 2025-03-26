'use client';

import { Project } from '@/repository/project-repository';
import styled from '@emotion/styled';
import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { PropsWithoutRef, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import FileUpload from '../FileUpload/FileUpload';
import { teamRepository } from '@/repository/team-repository';
import useSWR from 'swr';

interface Filters {
  search: string;
}

export interface FormProps {
  className?: string;
  editOriginValue?: Project;
  handleBackClick: () => void;
  handleSubmit: (data: Project) => void;
}

const ProjectForm = (props: PropsWithoutRef<FormProps>) => {
  const [filters, setFilters] = useState<Filters>({ search: '' });
  const { className, editOriginValue, handleBackClick, handleSubmit } = props;
  const isUpdateMode = useMemo(() => !!editOriginValue, [editOriginValue]);

  const {
    register,
    setValue,
    watch,
    handleSubmit: onSubmit,
  } = useForm<Project>({
    mode: 'onSubmit',
    defaultValues: {
      teamId: editOriginValue?.teamId || '',
      name: editOriginValue?.name || '',
      thumbnailImageUrl: editOriginValue?.thumbnailImageUrl || '',
    },
  });

  const { data: teams } = useSWR(['teams', filters], () =>
    teamRepository.getList({ search: filters.search }),
  );

  const teamIdValue = watch('teamId');

  const handleThumbnailUploadComplete = (uploadedFiles: any[]) => {
    const successfulUpload = uploadedFiles
      .filter((file) => file.uploaded)
      .map((file) => file.uploaded)[0];

    if (successfulUpload) {
      setValue('thumbnailImageUrl', successfulUpload.publicUrl);
    }
  };

  const handleThumbnailRemove = () => {
    setValue('thumbnailImageUrl', '');
  };

  const handleFileUploadError = (error: string) => {
    // TODO: 고민
    console.error('File upload error:', error);
  };

  return (
    <FormWrapper onSubmit={onSubmit(handleSubmit)} className={className}>
      <div className='project-form__wrapper'>
        <div className='project-form__content'>
          <h1 className='project-form__content__title'>{`프로젝트 ${isUpdateMode ? '수정 ' : '등록 '}`}</h1>
          <Box sx={{ p: 2 }}>
            <InputLabel htmlFor='teamId' className='project-form__content__label' required>
              프로젝트
            </InputLabel>
            <Select
              label='teamId'
              className='project-form__content__input'
              sx={{ width: '100%' }}
              {...register('teamId')}
              value={teamIdValue ?? ''}
            >
              {teams?.data.map((team, index) => {
                return (
                  <MenuItem value={team.id} key={index}>
                    {team.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <InputLabel htmlFor='name' className='project-form__content__label' required>
            프로젝트명
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='project-form__content__input'
            {...register('name')}
            placeholder='프로젝트명을 입력해주세요.'
            multiline
            required
          />

          <InputLabel htmlFor='thumbnailImageUrl' className='project-form__content__label' required>
            썸네일 이미지
          </InputLabel>
          <FileUpload
            id='thumbnail-upload'
            access='public'
            maxFiles={1}
            maxSize={10 * 1024 * 1024} // 10MB
            accept='image/*'
            fileUrls={watch('thumbnailImageUrl')}
            onUploadComplete={handleThumbnailUploadComplete}
            onRemove={handleThumbnailRemove}
            onError={handleFileUploadError}
          />

          <div className='project-form__button-container'>
            <Button
              size='large'
              variant='outlined'
              onClick={handleBackClick}
              className='project-form__cancel-button'
            >
              취소
            </Button>
            <Button
              size='large'
              variant='contained'
              type='submit'
              className='project-form__submit-button'
            >
              {isUpdateMode ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ProjectForm;

const FormWrapper = styled.form`
  .project-form__wrapper {
    display: flex;
    flex-direction: column;

    .project-form__content {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0 24px;
      @media only screen and (max-width: 600px) {
        padding: 16px;
      }

      .project-form__content__title {
        padding: 24px 16px;
        font-size: 48px;
        font-weight: 800;

        @media only screen and (max-width: 600px) {
          padding: 16px;
          font-size: 32px;
        }
      }
      .project-form__content__label {
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
      .project-form__content__input {
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

        &.summary {
          height: 300px;
          margin-bottom: 30px;
          font-family: 'Pretendard';

          p {
            font-family: 'Pretendard';
            font-size: 16px;
          }
        }
      }
      .quill > .ql-container > .ql-editor.ql-blank::before {
        font-size: 16px;
        font-family: 'Pretendard';
        font-style: normal;
      }

      .content-editor {
        margin-bottom: 100px;
      }
      .project-form__button-container {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 52px;
        margin-bottom: 50px;

        button {
          width: 250px;
        }

        .project-form__submit-button:hover {
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
