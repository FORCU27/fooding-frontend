'use client';

import { PropsWithoutRef, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { Button, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import FileUpload from '../FileUpload/FileUpload';
import QuillEditor from '../QuillEditor';
import { Portfolio } from '@/repository/portfolio-repository';

export interface FormProps {
  className?: string;
  editOriginValue?: Portfolio;
  handleBackClick: () => void;
  handleSubmit: (data: Portfolio) => void;
}

const PortfolioForm = (props: PropsWithoutRef<FormProps>) => {
  const { className, editOriginValue, handleBackClick, handleSubmit } = props;
  const isUpdateMode = useMemo(() => !!editOriginValue, [editOriginValue]);

  const {
    register,
    setValue,
    watch,
    handleSubmit: onSubmit,
  } = useForm<Portfolio>({
    mode: 'onSubmit',
    defaultValues: {
      slug: editOriginValue?.slug || '',
      title: editOriginValue?.title || '',
      tags: editOriginValue?.tags || '',
      roles: editOriginValue?.roles || '',
      link: editOriginValue?.link || '',
      thumbnailImageUrl: editOriginValue?.thumbnailImageUrl || '',
      imgUrl: editOriginValue?.imgUrl || '',
      summary: editOriginValue?.summary || '',
    },
  });

  const summaryData = watch('summary');

  useEffect(() => {
    register('summary', { required: true });
  }, [register]);

  const handleChangeSummary = (summaryVal: string) => {
    setValue('summary', summaryVal);
  };

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

  const handleImagesUploadComplete = (uploadedFiles: any[]) => {
    const successfulUploads = uploadedFiles
      .filter((file) => file.uploaded)
      .map((file) => file.uploaded.publicUrl);

    // 기존 이미지 URL들과 새로운 URL들을 합침
    const currentUrls = watch('imgUrl')
      .split(',')
      .filter((url) => url.trim());
    const newUrls = [...currentUrls, ...successfulUploads];
    setValue('imgUrl', newUrls.join(','));
  };

  const handleImagesRemove = (removedUrl: string) => {
    const currentUrls = watch('imgUrl')
      .split(',')
      .filter((url) => url.trim());
    const updatedUrls = currentUrls.filter((url) => url !== removedUrl);
    setValue('imgUrl', updatedUrls.join(','));
  };

  return (
    <FormWrapper onSubmit={onSubmit(handleSubmit)} className={className}>
      <div className='portfolio-form__wrapper'>
        <div className='portfolio-form__content'>
          <h1 className='portfolio-form__content__title'>{`포트폴리오 ${isUpdateMode ? '수정 ' : '등록 '}`}</h1>
          <InputLabel htmlFor='slug' className='portfolio-form__content__label' required>
            slug
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='portfolio-form__content__input'
            placeholder='포트폴리오 영문명을 입력해주세요.'
            {...register('slug')}
            multiline
            required
          />
          <InputLabel htmlFor='title' className='portfolio-form__content__label' required>
            포트폴리오명
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='portfolio-form__content__input'
            {...register('title')}
            placeholder='포트폴리오명을 입력해주세요.'
            multiline
            required
          />
          <InputLabel htmlFor='tags' className='portfolio-form__content__label' required>
            태그
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='portfolio-form__content__input'
            {...register('tags')}
            placeholder='React,NextJS 등'
            multiline
            required
          />
          <InputLabel htmlFor='roles' className='portfolio-form__content__label' required>
            참여분야
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='portfolio-form__content__input'
            {...register('roles')}
            placeholder='개발,기획,디자인 등'
            multiline
            required
          />
          <InputLabel htmlFor='link' className='portfolio-form__content__label' required>
            링크
          </InputLabel>
          <TextField
            size='small'
            id='outlined-required'
            className='portfolio-form__content__input'
            {...register('link')}
            multiline
            placeholder='링크URL을 입력해주세요.'
          />

          <InputLabel
            htmlFor='thumbnailImageUrl'
            className='portfolio-form__content__label'
            required
          >
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

          <InputLabel htmlFor='imgUrl' className='portfolio-form__content__label' required>
            본문 이미지
          </InputLabel>
          <FileUpload
            id='images-upload'
            access='public'
            maxFiles={1}
            maxSize={10 * 1024 * 1024} // 10MB
            accept='image/*'
            fileUrls={watch('imgUrl')}
            onUploadComplete={handleImagesUploadComplete}
            onRemove={handleImagesRemove}
            onError={handleFileUploadError}
          />

          <div className='content-editor'>
            <InputLabel htmlFor='summary' className='portfolio-form__content__label'>
              한줄소개
            </InputLabel>
            <QuillEditor
              value={summaryData}
              placeholder='내용을 입력해 주세요.'
              onChange={handleChangeSummary}
              className='portfolio-form__content__input summary'
            />
          </div>
          <div className='portfolio-form__button-container'>
            <Button
              size='large'
              variant='outlined'
              onClick={handleBackClick}
              className='portfolio-form__cancel-button'
            >
              취소
            </Button>
            <Button
              size='large'
              variant='contained'
              type='submit'
              className='portfolio-form__submit-button'
            >
              {isUpdateMode ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default PortfolioForm;

const FormWrapper = styled.form`
  .portfolio-form__wrapper {
    display: flex;
    flex-direction: column;

    .portfolio-form__content {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 0 24px;
      @media only screen and (max-width: 600px) {
        padding: 16px;
      }

      .portfolio-form__content__title {
        padding: 24px 16px;
        font-size: 48px;
        font-weight: 800;

        @media only screen and (max-width: 600px) {
          padding: 16px;
          font-size: 32px;
        }
      }
      .portfolio-form__content__label {
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
      .portfolio-form__content__input {
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
      .portfolio-form__button-container {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 52px;
        margin-bottom: 50px;

        button {
          width: 250px;
        }

        .portfolio-form__submit-button:hover {
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
