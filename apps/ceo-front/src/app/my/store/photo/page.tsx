'use client';

import { useRef, useState } from 'react';

import { ImageTag, ImagesSortType } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { CardForm, Button } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import EditTagModal from './components/EditTagModal';
import PhotoFilterBar from './components/PhotoFilterBar';
import PhotoList from './components/PhotoList';
import PhotoUploader from './components/PhotoUploader';
import ConfirmModal from '@/components/ConfirmModal';
import {
  useStoreImages,
  useCreateImage,
  useDeleteImage,
  useEditImage,
  useRegisterMainImage,
} from '@/hooks/store/useStoreImages';
import { useUploadFile } from '@/hooks/useUploadFile';

type ModalState = { type: 'editTag'; photoId: number } | { type: 'delete'; photoId: number } | null;

type ImageParams = {
  page: number;
  sortType: ImagesSortType;
  tag: ImageTag | null;
};

const PhotoPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [modalType, setModalType] = useState<ModalState>(null);
  const [selectedTags, setSelectedTags] = useState<ImageTag[]>([]);
  const [params, setParams] = useState<ImageParams>({
    page: 1,
    sortType: 'RECENT',
    tag: null,
  });

  // TODO: 선택 매장 조회 로직 → 추후 localStorage + Context 방식으로 리팩토링 예정
  const { data: selectedStore } = useQuery({
    queryKey: [queryKeys.ceo.store.selectedStore],
    queryFn: async () => {
      const res = await fetch('/api/store/select', { cache: 'no-store' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  const storeId = selectedStore?.data?.id;

  const { data: images, isFetching } = useStoreImages({
    storeId,
    sortType: params.sortType,
    page: params.page,
    tag: params.tag,
  });

  const uploadFile = useUploadFile();
  const createImage = useCreateImage();
  const deleteImage = useDeleteImage();
  const editImage = useEditImage();
  const registerMainImage = useRegisterMainImage();

  // 파일 추가 버튼 클릭
  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  // 파일 업로드
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storeId) return;

    try {
      const formData = new FormData();
      formData.append('files', file);
      const uploadResult = await uploadFile.mutateAsync(formData);

      const imageId = uploadResult.data?.[0]?.id;
      if (!imageId) throw new Error('업로드 결과에 imageId 없음');

      await createImage.mutateAsync({
        storeId,
        body: { imageId },
      });
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
    }
  };

  // 삭제 확인
  const handleConfirmDelete = async (photoId: number) => {
    if (!storeId) return;
    await deleteImage.mutateAsync({ storeId, photoId });
    setModalType(null);
  };

  // 태그 수정 확인
  const handleConfirmEdit = async (photoId: number) => {
    if (!storeId || !modalType?.photoId) return;

    const targetPhoto = images?.data?.list.find((p) => p.id === modalType.photoId);
    if (!targetPhoto) return;

    editImage.mutate({
      storeId,
      photoId,
      body: { tags: selectedTags },
    });

    setModalType(null);
  };

  return (
    <>
      <CardForm>
        <div className='headline-2'>사진</div>
        <div className='flex flex-col self-end w-full'>
          {/* 업로드 버튼 */}
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

          {/* 필터/정렬 바 */}
          <div className='self-end mb-[20px]'>
            <PhotoFilterBar
              sortType={params.sortType}
              tag={params.tag}
              onChangeSort={(sort) => setParams((prev) => ({ ...prev, sortType: sort, page: 1 }))}
              onChangeTag={(tag) => setParams((prev) => ({ ...prev, tag, page: 1 }))}
            />
          </div>

          {/* 목록 or 빈 상태 */}
          {!storeId || isFetching || images?.data?.list.length === 0 ? (
            <div className='pb-[200px]'>
              <PhotoUploader onUploadClick={handleAddImage} />
            </div>
          ) : (
            <PhotoList
              photos={images?.data?.list ?? []}
              page={params.page}
              totalPages={images?.data.pageInfo.totalPages ?? 1}
              onChangePage={(page) => setParams((prev) => ({ ...prev, page }))}
              onDelete={(id) => setModalType({ type: 'delete', photoId: id })}
              onEditTag={(id) => setModalType({ type: 'editTag', photoId: id })}
              onToggleMain={(id, isMain) =>
                registerMainImage.mutate({
                  storeId,
                  photoId: id,
                  body: { isMain },
                })
              }
            />
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
      <EditTagModal
        open={modalType?.type === 'editTag'}
        selectedTags={selectedTags}
        onChange={setSelectedTags}
        onConfirm={() => modalType && handleConfirmEdit(modalType.photoId)}
        onCancel={() => setModalType(null)}
      />
    </>
  );
};

export default PhotoPage;
