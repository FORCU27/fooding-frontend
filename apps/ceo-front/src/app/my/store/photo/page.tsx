'use client';

import { useRef, useState } from 'react';

import { ImageTag } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { ChipTabs } from '@repo/design-system/components/b2c';
import {
  CardForm,
  PhotoCard,
  Button,
  SortToggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import ConfirmModal from '@/components/ConfirmModal';
import {
  useStoreImages,
  useCreateImage,
  useDeleteImage,
  useEditImage,
  useRegisterMainImage,
} from '@/hooks/store/useStoreImages';
import { useUploadFile } from '@/hooks/useUploadFile';

const PhotoPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedChip, setSelectedChip] = useState<'ALL' | ImageTag>('ALL');
  const [modalType, setModalType] = useState<null | {
    type: 'editTag' | 'delete';
    photoId: number;
  }>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: selectedStore } = useQuery({
    queryKey: [queryKeys.ceo.store.selectedStore],
    queryFn: async () => {
      const res = await fetch('/api/store/select', { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const storeId = selectedStore?.data?.id;

  const { data: images, isFetching } = useStoreImages(
    storeId,
    selectedChip === 'ALL' ? null : selectedChip,
  );
  const uploadFile = useUploadFile();
  const createImage = useCreateImage();
  const deleteImage = useDeleteImage();
  const editImage = useEditImage();
  const registerMainImage = useRegisterMainImage();

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

  // 삭제 확인 핸들러
  const handleConfirmDelete = async (photoId: number) => {
    if (!storeId) return;
    await deleteImage.mutateAsync({ storeId, photoId });
    setModalType(null);
  };

  const handleConfirmEdit = async (photoId: number) => {
    if (!storeId || !modalType?.photoId) return;

    // 현재 수정할 대상 사진 찾기
    const targetPhoto = images?.data?.list.find((p) => p.id === modalType.photoId);
    if (!targetPhoto) return;

    editImage.mutate({
      storeId,
      photoId: photoId,
      body: {
        tags: selectedTags as ImageTag[],
      },
    });

    setModalType(null);
  };

  // 태그 수정 핸들러
  const handleEditTag = (photoId: number) => {
    setModalType({ type: 'editTag', photoId });
  };
  console.log('modalType', modalType);

  return (
    <>
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
            <ChipTabs
              defaultValue='1'
              value={selectedChip}
              onChange={(value) => setSelectedChip(value as 'ALL' | ImageTag)}
            >
              <ChipTabs.List className='gap-[8px]'>
                <ChipTabs.Trigger value='ALL' className='h-[38px] px-[18px] body-2'>
                  전체
                </ChipTabs.Trigger>
                <ChipTabs.Trigger value='EXTERIOR' className='h-[38px] px-[18px] body-2'>
                  외부
                </ChipTabs.Trigger>
                <ChipTabs.Trigger value='FOOD' className='h-[38px] px-[18px] body-2'>
                  음식
                </ChipTabs.Trigger>
                <SortToggle keepSelectedOpen onSortChange={function hX() {}} value='LATEST' />
              </ChipTabs.List>
            </ChipTabs>
          </div>
          {!storeId || isFetching || images?.data?.list.length === 0 ? (
            <div className='columns-3'>목록이 비어있습니다.</div>
          ) : (
            <div className='columns-2 md:columns-4 gap-[20px]'>
              {images?.data.list.map((photo) => (
                <div key={photo.id} className='mb-[20px] break-inside-avoid'>
                  <PhotoCard
                    src={photo.imageUrl}
                    alt='photo image'
                    flags={{ isRepresentative: photo.isMain }}
                    actions={{
                      onDelete: () => setModalType({ type: 'delete', photoId: photo.id }),
                      onEditTag: () => handleEditTag(photo.id),
                      onSetRepresentative: () =>
                        registerMainImage.mutate({
                          storeId,
                          photoId: photo.id,
                          body: { isMain: true },
                        }),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardForm>
      {/* 삭제 모달 */}
      <ConfirmModal
        open={modalType?.type === 'delete'}
        title='사진을 삭제하겠습니까?'
        confirmLabel='확인'
        cancelLabel='취소'
        onCancel={() => setModalType(null)}
        onConfirm={() => modalType && handleConfirmDelete(modalType.photoId)}
      />
      {/* 태그 수정 모달 */}
      <ConfirmModal
        open={modalType?.type === 'editTag'}
        title='태그 수정'
        confirmLabel='확인'
        cancelLabel='취소'
        onCancel={() => setModalType(null)}
        onConfirm={() => handleConfirmEdit(modalType?.photoId as number)}
      >
        <div className='flex flex-col gap-[24px]'>
          <h3 className='subtitle-6 text-gray-5 mt-[-16px]'>
            사진을 잘 설명하는 태그를 골라주세요.
          </h3>
          <ToggleGroup type='multiple' onValueChange={(values) => setSelectedTags(values)}>
            <ToggleGroupItem value='PRICE_TAG'>가격표</ToggleGroupItem>
            <ToggleGroupItem value='FOOD'>음식</ToggleGroupItem>
            <ToggleGroupItem value='BEVERAGE'>음료</ToggleGroupItem>
            <ToggleGroupItem value='INTERIOR'>내부</ToggleGroupItem>
            <ToggleGroupItem value='EXTERIOR'>외부</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ConfirmModal>
    </>
  );
};

export default PhotoPage;
