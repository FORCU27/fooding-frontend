import { PropsWithoutRef, useRef } from 'react';

import { CreateStoreReviewBody, Review, VISIT_PURPOSES } from '@repo/api/user';
import { Button, Select } from '@repo/design-system/components/b2c';
import { CloseIcon, ImageIcon } from '@repo/design-system/icons';
import { Controller, useForm } from 'react-hook-form';

import { StarRating } from '@/components/Store/StarRating';

export interface ReviewFormProps {
  review?: Review;
  handleSubmit: (data: CreateStoreReviewBody & { imageFiles: File[] }) => void;
}

export enum VisitPurpose {
  MEETING = 'MEETING',
  DATE = 'DATE',
  FRIEND = 'FRIEND',
  FAMILY = 'FAMILY',
  BUSINESS = 'BUSINESS',
  PARTY = 'PARTY',
}

export const VisitPurposeLabels: Record<VisitPurpose, string> = {
  [VisitPurpose.MEETING]: '미팅',
  [VisitPurpose.DATE]: '데이트',
  [VisitPurpose.FRIEND]: '친구와',
  [VisitPurpose.FAMILY]: '가족과',
  [VisitPurpose.BUSINESS]: '업무',
  [VisitPurpose.PARTY]: '파티',
};

export const ReviewForm = ({ review, handleSubmit }: PropsWithoutRef<ReviewFormProps>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxLength = 1000;

  const {
    register,
    handleSubmit: onSubmit,
    setValue,
    watch,
    control,
  } = useForm<CreateStoreReviewBody & { imageFiles: File[] }>({
    mode: 'onSubmit',
    defaultValues: {
      content: review?.content || '',
      imageUrls: review?.imageUrls || [],
      imageFiles: [],
      visitPurpose: (review?.purpose as VisitPurpose) || 'DATE',
      taste: review?.score.taste || 0,
      mood: review?.score.mood || 0,
      service: review?.score.service || 0,
    },
  });

  const handleStarChange = (category: 'taste' | 'mood' | 'service', score: number) => {
    setValue(category, score);
  };

  const text = watch('content') || '';
  const imageUrls = watch('imageUrls') || [];
  const tasteScore = watch('taste');
  const serviceScore = watch('service');
  const moodScore = watch('mood');

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = (indexToRemove: number) => {
    const currentUrls = watch('imageUrls') || [];
    const currentFiles = watch('imageFiles') || [];

    const updatedUrls = currentUrls.filter((_, i) => i !== indexToRemove);
    const updatedFiles = currentFiles.filter((_, i) => i !== indexToRemove);

    setValue('imageUrls', updatedUrls);
    setValue('imageFiles', updatedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentFiles = watch('imageFiles') || [];
    const updatedFiles = [...currentFiles, ...files];
    setValue('imageFiles', updatedFiles, { shouldValidate: true, shouldDirty: true });

    const readers = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((base64Images) => {
      const currentUrls = watch('imageUrls') || [];
      setValue('imageUrls', [...currentUrls, ...base64Images], {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };

  const onFormSubmit = (data: CreateStoreReviewBody & { imageFiles: File[] }) => {
    handleSubmit(data);
  };

  return (
    <form onSubmit={onSubmit(onFormSubmit)} className='flex flex-col gap-10'>
      <div className='flex flex-col gap-10 mb-10 justify-center items-center'>
        <div className='flex subtitle-4 justify-around w-full'>
          <div className='min-w-[45px]'>음식</div>
          <StarRating
            starSize={24}
            defaultValue={tasteScore}
            onChange={(val) => handleStarChange('taste', val)}
          />
          <p {...register('taste')}>{tasteScore !== undefined ? tasteScore.toFixed(1) : '0.0'}</p>
        </div>
        <div className='flex subtitle-4 justify-around w-full'>
          <div className='min-w-[45px]'>분위기</div>
          <StarRating
            starSize={24}
            defaultValue={moodScore}
            onChange={(val) => handleStarChange('mood', val)}
          />
          <p {...register('mood')}>{moodScore !== undefined ? moodScore.toFixed(1) : '0.0'}</p>
        </div>
        <div className='flex subtitle-4 justify-around w-full'>
          <div className='min-w-[45px]'>서비스</div>
          <StarRating
            starSize={24}
            defaultValue={serviceScore}
            onChange={(val) => handleStarChange('service', val)}
          />
          <p {...register('service')}>
            {serviceScore !== undefined ? serviceScore.toFixed(1) : '0.0'}
          </p>
        </div>
        <div className='w-full px-8'>
          <Controller
            name='visitPurpose'
            control={control}
            render={({ field }) => (
              <Select {...field} label='방문 목적'>
                {VISIT_PURPOSES.map((visitOption) => (
                  <Select.Option key={visitOption} value={visitOption}>
                    {VisitPurposeLabels[visitOption]}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </div>
      </div>

      <input
        type='file'
        accept='image/png, image/jpg, image/jpeg'
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className='hidden'
      />
      <Button variant='gray' type='button' onClick={handleImageClick}>
        <ImageIcon />
        <span className='ml-2'>사진 추가하기</span>
      </Button>

      <div className='flex gap-2 overflow-x-auto scrollbar-hide flex-nowrap'>
        {imageUrls.map((url, idx) => (
          <div key={idx} className='relative min-w-[100px] min-h-[100px]'>
            <img
              src={url}
              alt={`preview-${idx}`}
              className='flex w-[100px] h-[100px] object-cover rounded-lg'
            />
            <button
              type='button'
              onClick={() => handleImageRemove(idx)}
              className='absolute top-1 right-1'
            >
              <CloseIcon className='text-white' />
            </button>
          </div>
        ))}
      </div>

      <div className='relative'>
        <textarea
          {...register('content')}
          maxLength={maxLength}
          className='w-full border border-gray-2 rounded-2xl p-6 h-[200px] resize-none focus:outline-none focus:border-gray-4'
        />
        <div className='text-right text-gray-5 body-8 mt-2 absolute p-6 bottom-1 right-1'>
          {text.length} / {maxLength}
        </div>
      </div>
      <Button type='submit'>리뷰 등록</Button>
    </form>
  );
};
