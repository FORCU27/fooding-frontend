'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { fileApi } from '@repo/api/file';
import { toast } from '@repo/design-system/components/b2c';
import { MenuPan } from '@repo/design-system/components/ceo';

import DeleteMenuBoardDialog from './DeleteMenuBoardDialog';
import {
  useCreateMenuBoard,
  useGetMenuBoards,
  useDeleteMenuBoard,
} from '@/hooks/menu-board/useMenuBoard';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';


type MenuBoardImage = {
  id: string;
  url: string;
  file?: File;
  title?: string;
};

interface MenuBoardImageUploadProps {
  images: MenuBoardImage[];
  onImagesChange: (images: MenuBoardImage[]) => void;
  maxImages?: number;
}

const MenuBoardImageUpload = ({
  images,
  onImagesChange,
  maxImages = 8,
}: MenuBoardImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  const { selectedStoreId } = useSelectedStoreId();

  const { data: menuBoards, isLoading } = useGetMenuBoards(selectedStoreId);
  const createMenuBoard = useCreateMenuBoard();
  const deleteMenuBoard = useDeleteMenuBoard();

  // 서버에서 가져온 메뉴판 이미지로 초기화
  useEffect(() => {
    if (menuBoards?.list && !isLoading) {
      const serverImages: MenuBoardImage[] = menuBoards.list.map((board) => ({
        id: `server-${board.id}`, // 서버 데이터임을 구분하기 위한 prefix
        url: board.imageUrl,
        title: board.title,
      }));
      onImagesChange(serverImages);
    }
  }, [menuBoards, isLoading, onImagesChange]);

  // Next.js Image 컴포넌트 래퍼
  const NextImageComponent = ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <Image src={src} alt={alt} fill className={className} style={{ objectFit: 'cover' }} />;

  const handleDeleteMenuBoard = (imageId: string) => {
    // 삭제 다이얼로그 띄우기
    setDeletingImageId(imageId);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStoreId || !deletingImageId) return;

    try {
      // 서버 데이터인 경우 API로 삭제
      if (deletingImageId.startsWith('server-')) {
        const menuBoardId = deletingImageId.replace('server-', '');
        await deleteMenuBoard.mutateAsync({
          storeId: selectedStoreId,
          menuBoardId: parseInt(menuBoardId),
        });
      }

      // 로컬 상태에서도 제거
      const updatedImages = images.filter((img) => img.id !== deletingImageId);
      onImagesChange(updatedImages);

      setDeletingImageId(null);
      toast.success('메뉴판이 삭제되었습니다.');
    } catch {
      toast.error('메뉴판 삭제에 실패했습니다.');
    }
  };

  const handleImagesChange = async (newImages: MenuBoardImage[]) => {
    if (!selectedStoreId) {
      onImagesChange(newImages);
      return;
    }

    // 새로 추가된 이미지들 중 file이 있는 것들을 업로드
    const imagesToUpload = newImages.filter((img) => img.file && img.id.startsWith('temp-'));

    if (imagesToUpload.length > 0) {
      setIsUploading(true);

      try {
        const uploadedImages: MenuBoardImage[] = [];

        for (const image of imagesToUpload) {
          if (image.file) {
            // 1. 파일 업로드
            const formData = new FormData();
            formData.append('files', image.file);
            const uploadResponse = await fileApi.upload(formData);

            if (uploadResponse.data && uploadResponse.data.length > 0) {
              const uploadedFile = uploadResponse.data[0];

              if (uploadedFile?.id && uploadedFile?.url) {
                // 2. 바로 메뉴판 생성
                await createMenuBoard.mutateAsync({
                  storeId: selectedStoreId,
                  title: `메뉴판 ${new Date().getTime()}`,
                  imageId: uploadedFile.id,
                });

                uploadedImages.push({
                  id: `server-${Date.now()}`, // 서버에 저장된 것으로 처리
                  url: uploadedFile.url,
                  title: `메뉴판 ${new Date().getTime()}`,
                });
              }
            }
          }
        }

        // 업로드된 이미지로 교체
        const finalImages = newImages.map((img) => {
          if (img.id.startsWith('temp-')) {
            const uploadedIndex = imagesToUpload.findIndex((temp) => temp.id === img.id);
            if (uploadedIndex >= 0 && uploadedImages[uploadedIndex]) {
              return uploadedImages[uploadedIndex];
            }
          }
          return img;
        });

        onImagesChange(finalImages);
        toast.success('메뉴판이 추가되었습니다.');
      } catch {
        toast.error('메뉴판 추가에 실패했습니다.');
      } finally {
        setIsUploading(false);
      }
    } else {
      onImagesChange(newImages);
    }
  };

  if (isLoading) {
    return <div>메뉴판 정보를 불러오는 중...</div>;
  }

  return (
    <div className='relative'>
      <MenuPan
        images={images}
        onImagesChange={handleImagesChange}
        onDeleteImage={handleDeleteMenuBoard}
        maxImages={maxImages}
        ImageComponent={NextImageComponent}
      />
      {isUploading && (
        <div className='absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center'>
          <div className='text-lg'>업로드 중...</div>
        </div>
      )}

      {/* 메뉴판 삭제 확인 다이얼로그 */}
      {deletingImageId && (
        <DeleteMenuBoardDialog
          open={!!deletingImageId}
          onOpenChange={(open) => !open && setDeletingImageId(null)}
          onConfirm={handleConfirmDelete}
          isDeleting={deleteMenuBoard.isPending}
        />
      )}
    </div>
  );
};

export default MenuBoardImageUpload;
