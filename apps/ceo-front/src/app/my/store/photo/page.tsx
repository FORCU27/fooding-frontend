'use client';

import { useEffect, useState, useRef } from 'react';

import { CardForm, PhotoCard, Button } from '@repo/design-system/components/ceo';

import { useStoreImages, useCreateImage, useDeleteImage } from '@/hooks/store/useStoreImages';
import { useUploadFile } from '@/hooks/useUploadFile';

const PhotoPage = () => {
  const [storeId, setStoreId] = useState<number | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: images, isFetching } = useStoreImages(storeId);
  const uploadFile = useUploadFile();
  const createImage = useCreateImage();
  const deleteImage = useDeleteImage();

  // 마운트 시 선택된 storeId 가져오기
  useEffect(() => {
    const fetchStore = async () => {
      const res = await fetch('/api/store/select');
      if (!res.ok) {
        console.error('스토어 조회 실패', res.status);
        return;
      }
      const data = await res.json();
      const id = data.data.id;

      setStoreId(typeof id === 'number' && !Number.isNaN(id) ? id : undefined);
    };

    fetchStore();
  }, []);

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
    <CardForm className=''>
      <div className='headline-2'>사진</div>
      <div className='self-end'>
        <Button
          variant='primary'
          type='button'
          onClick={handleAddImage}
          className='py-[12px] px-[20px]'
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

      {!storeId || isFetching || images?.data?.list.length === 0 ? (
        <div>목록이 비어있습니다.</div>
      ) : (
        <div className='grid grid-cols-3 gap-4 mt-4'>
          {images?.data?.list.map((photo) => (
            <PhotoCard
              key={photo.id}
              src={photo.imageUrl}
              alt='photo image'
              actions={{
                onDelete: () => deleteImage.mutate({ storeId, photoId: photo.id }),
              }}
            />
          ))}
        </div>
      )}
    </CardForm>
  );
};

export default PhotoPage;
