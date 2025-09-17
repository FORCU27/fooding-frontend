'use client';

import { useRef } from 'react';

import { queryKeys } from '@repo/api/configs/query-keys';
import { ChipTabs } from '@repo/design-system/components/b2c';
import { CardForm, PhotoCard, Button, SortToggle } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import { useStoreImages, useCreateImage, useDeleteImage } from '@/hooks/store/useStoreImages';
import { useUploadFile } from '@/hooks/useUploadFile';

const PhotoPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: selectedStore } = useQuery({
    queryKey: [queryKeys.ceo.store.selectedStore],
    queryFn: async () => {
      const res = await fetch('/api/store/select', { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const storeId = selectedStore?.data?.id;

  const { data: images, isFetching } = useStoreImages(storeId);
  const uploadFile = useUploadFile();
  const createImage = useCreateImage();
  const deleteImage = useDeleteImage();

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storeId) return;

    try {
      // 1. 파일 업로드
      const formData = new FormData();
      formData.append('files', file);
      const uploadResult = await uploadFile.mutateAsync(formData);

      const imageId = uploadResult.data?.[0]?.id;
      if (!imageId) throw new Error('업로드 결과에 imageId 없음');

      // 2. 매장 이미지 등록
      await createImage.mutateAsync({
        storeId,
        body: { imageId },
      });
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
    }
  };

  return (
    <CardForm>
      <div className='headline-2'>사진</div>
      <div className='flex flex-col self-end w-full'>
      <div className='self-end mb-[18px]'>
        <Button
          variant='primary'
          className='py-[12px] px-[20px] h-auto'
          type='button'
          onClick={handleAddImage}
        >
          사진추가
        </Button>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      <div className='self-end mb-[20px]'>
      <ChipTabs defaultValue='1'>
        <ChipTabs.List className='gap-[8px]'>
          <ChipTabs.Trigger value='1' className='h-[38px] px-[18px] body-2'>전체</ChipTabs.Trigger>
          <ChipTabs.Trigger value='2' className='h-[38px] px-[18px] body-2'>외부</ChipTabs.Trigger>
          <ChipTabs.Trigger value='3' className='h-[38px] px-[18px] body-2'>음식</ChipTabs.Trigger>
          <SortToggle
            keepSelectedOpen
            onSortChange={function hX(){}}
            value="LATEST"
          />
        </ChipTabs.List>
      </ChipTabs>
      </div>
      {!storeId || isFetching || images?.data?.list.length === 0 ? (
        <div className='columns-3'>목록이 비어있습니다.</div>
      ) : (
        <div className='columns-3 gap-[20px]'>
          {images?.data.list.map((photo) => (
            <div key={photo.id} className='mb-[20px] break-inside-avoid'>
              <PhotoCard
                src={photo.imageUrl}
                alt='photo image'
                actions={{ onDelete: () => deleteImage.mutate({ storeId, photoId: photo.id }) }}
              />
            </div>
          ))}
        </div>
      )}
      </div>
    </CardForm>
  );
};

export default PhotoPage;
