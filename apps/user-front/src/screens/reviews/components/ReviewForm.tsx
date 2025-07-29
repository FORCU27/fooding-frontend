/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';

import { CreateStoreReviewBody } from '@repo/api/user';
import { Button } from '@repo/design-system/components/b2c';
import { CloseIcon, ImageIcon } from '@repo/design-system/icons';
import { useForm } from 'react-hook-form';

import { StarRating } from '@/components/Store/StarRating';

export interface ReviewFormProps {
  handleSubmit: (data: CreateStoreReviewBody) => void;
}

export const ReviewForm = ({ handleSubmit }: ReviewFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxLength = 1000;
  const {
    register,
    handleSubmit: onSubmit,
    setValue,
    watch,
  } = useForm<CreateStoreReviewBody>({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
      imageUrls: [],
      taste: 0,
      mood: 0,
      service: 0,
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
    const updated = imageUrls.filter((_, i) => i !== indexToRemove);
    setValue('imageUrls', updated);
  };

  //TODO: 파일 업로드 API 나오면 수정
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const readers = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((base64Images) => {
      setValue('imageUrls', [...imageUrls, ...base64Images]);
    });
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)} className='flex flex-col gap-10'>
      <div className='flex flex-col gap-10 mb-10 justify-center items-center'>
        <div className='flex subtitle-4 justify-around w-full'>
          <div className='min-w-[45px]'>음식</div>
          <StarRating starSize={24} onChange={(val) => handleStarChange('taste', val)} />
          <p {...register('taste')}>{tasteScore !== undefined ? tasteScore.toFixed(1) : '0.0'}</p>
        </div>
        <div className='flex subtitle-4 justify-around w-full'>
          <div className='min-w-[45px]'>분위기</div>
          <StarRating starSize={24} onChange={(val) => handleStarChange('mood', val)} />
          <p {...register('mood')}>{moodScore !== undefined ? moodScore.toFixed(1) : '0.0'}</p>
        </div>
        <div className='flex subtitle-4 justify-around w-full'>
          <div className='min-w-[45px]'>서비스</div>
          <StarRating starSize={24} onChange={(val) => handleStarChange('service', val)} />
          <p {...register('service')}>
            {serviceScore !== undefined ? serviceScore.toFixed(1) : '0.0'}
          </p>
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
