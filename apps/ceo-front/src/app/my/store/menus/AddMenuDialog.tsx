'use client';

import { useState, useRef } from 'react';

import { menuApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { fileApi } from '@repo/api/file';
import { Dialog, Button, Input, TextArea, Checkbox } from '@repo/design-system/components/ceo';
import { X } from '@repo/design-system/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

interface MenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: number;
  menuItem?: {
    id: number;
    name: string;
    price: number;
    description: string;
    isSignature: boolean;
    isRecommend: boolean;
    imageUrls?: string[];
    imageIds?: string[];
  };
  mode?: 'add' | 'edit';
}

const MenuDialog = ({ open, onOpenChange, categoryId, menuItem, mode = 'add' }: MenuDialogProps) => {
  const queryClient = useQueryClient();
  const { selectedStoreId } = useSelectedStoreId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: menuItem?.name || '',
    price: menuItem?.price?.toString() || '',
    description: menuItem?.description || '',
    isSignature: menuItem?.isSignature || false,
    isRecommend: menuItem?.isRecommend || false,
    isNew: false,
  });

  const [images, setImages] = useState<string[]>(menuItem?.imageUrls || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadedImageIds, setUploadedImageIds] = useState<string[]>([]);

  // 기존 이미지 ID들을 직접 사용
  const [existingImageIds] = useState<string[]>(menuItem?.imageIds || []);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // 이미지 업로드 함수
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file); // 서버는 'files' 파라미터를 기대함

    try {
      setIsUploadingImage(true);
      const response = await fileApi.upload(formData);

      // 응답에서 첫 번째 파일의 id 반환
      if (response.data && response.data.length > 0 && response.data[0]?.id) {
        return response.data[0].id;
      }
      return null;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    } finally {
      setIsUploadingImage(false);
    }
  };

  // 메뉴 생성 mutation
  const createMenuMutation = useMutation({
    mutationFn: async () => {
      if (!selectedStoreId) throw new Error('스토어가 선택되지 않았습니다.');

      // 아직 업로드되지 않은 이미지가 있으면 업로드
      if (imageFiles.length > uploadedImageIds.length) {
        const remainingFiles = imageFiles.slice(uploadedImageIds.length);
        try {
          const uploadPromises = remainingFiles.map((file) => uploadImage(file));
          const newImageIds = await Promise.all(uploadPromises);
          const validIds = newImageIds.filter((id): id is string => id !== null);
          setUploadedImageIds((prev) => [...prev, ...validIds]);
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          // 이미지 업로드 실패해도 메뉴는 생성 가능
        }
      }

      // 메뉴 생성 또는 수정
      const menuData = {
        storeId: selectedStoreId,
        categoryId,
        name: formData.name,
        price: formData.price === '0' ? undefined : parseInt(formData.price), // 변동가격인 경우 price를 보내지 않음
        description: formData.description, // 필수 필드
        sortOrder: 1, // API에서 자동 정렬
        isSignature: formData.isSignature,
        isRecommend: formData.isRecommend,
        imageIds: mode === 'edit'
          ? [...existingImageIds, ...uploadedImageIds] // 수정 모드: 기존 + 새로운 이미지
          : uploadedImageIds, // 생성 모드: 새로운 이미지만
      };

      const response = mode === 'edit' && menuItem
        ? await menuApi.updateMenu(menuItem.id, menuData)
        : await menuApi.createMenu(menuData);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.ceo.menu.list,
          {
            storeId: selectedStoreId,
            categoryId,
            pageNum: 1,
            pageSize: 100,
          },
        ],
      });
      handleClose();
    },
    onError: (error) => {
      console.error('메뉴 추가 실패:', error);
      alert('메뉴 추가에 실패했습니다.');
    },
  });

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    // 기존 이미지와 합쳐서 최대 3개까지만 허용
    const remainingSlots = 3 - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    if (filesToProcess.length === 0) {
      alert('최대 3개까지 이미지를 업로드할 수 있습니다.');
      return;
    }

    // 미리보기를 위한 로컬 URL 생성 (여러 파일 처리)
    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    for (const file of filesToProcess) {
      const reader = new FileReader();
      const preview = await new Promise<string>((resolve) => {
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.readAsDataURL(file);
      });
      newPreviews.push(preview);
      newFiles.push(file);
    }

    setImages((prev) => [...prev, ...newPreviews]);
    setImageFiles((prev) => [...prev, ...newFiles]);

    // 모든 새 파일을 업로드
    try {
      const uploadPromises = newFiles.map((file) => uploadImage(file));
      const imageIds = await Promise.all(uploadPromises);
      const validIds = imageIds.filter((id): id is string => id !== null);

      setUploadedImageIds((prev) => [...prev, ...validIds]);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadedImageIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!formData.name.trim()) {
      alert('메뉴명을 입력해주세요.');
      return;
    }

    if (!formData.description.trim()) {
      alert('메뉴 설명을 입력해주세요.');
      return;
    }

    const price = parseInt(formData.price);
    if (formData.price !== '0' && (isNaN(price) || price <= 0)) {
      alert('올바른 가격을 입력해주세요.');
      return;
    }

    if (formData.name.length > 20) {
      alert('메뉴명은 20자 이내로 입력해주세요.');
      return;
    }

    if (formData.description.length > 50) {
      alert('메뉴 설명은 50자 이내로 입력해주세요.');
      return;
    }

    createMenuMutation.mutate();
  };

  const handleClose = () => {
    // 폼 초기화
    setFormData({
      name: '',
      price: '',
      description: '',
      isSignature: false,
      isRecommend: false,
      isNew: false,
    });
    setImages([]);
    setImageFiles([]);
    setUploadedImageIds([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className='max-w-[600px] max-h-[80vh]' showCloseButton={true}>
        <Dialog.Header>
          <Dialog.Title>{mode === 'edit' ? '메뉴 수정' : '메뉴 추가'}</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body className='space-y-6'>
          {/* 메뉴명 입력 */}
          <div className='space-y-2'>
            <label className='flex items-center justify-between gap-1'>
              <div>
                <span className='text-sm font-medium'>메뉴명</span>
                <span className='text-blue-500'>*</span>
              </div>
              <div className='space-y-2'>
                <div className='flex gap-4'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <Checkbox
                      labelText='대표'
                      checked={formData.isSignature}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev) => ({ ...prev, isSignature: e.target.checked }))
                      }
                    />
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <Checkbox
                      labelText='추천'
                      checked={formData.isRecommend}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev) => ({ ...prev, isRecommend: e.target.checked }))
                      }
                    />
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <Checkbox
                      labelText='신규'
                      checked={formData.isNew}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, isNew: e.target.checked }))}
                    />
                  </label>
                </div>
              </div>
            </label>
            <Input
              placeholder='메뉴명을 입력해주세요'
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              maxLength={20}
            />
            <div className='text-right text-xs text-gray-500'>{formData.name.length} / 20자</div>
          </div>

          {/* 가격 입력 */}
          <div className='space-y-2'>
            <label className='flex items-center gap-1 justify-between'>
              <div>
                <span className='text-sm font-medium'>가격</span>
                <span className='text-blue-500'>*</span>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox
                  labelText='변동가격'
                  checked={formData.price === '0'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.checked) {
                      setFormData((prev) => ({ ...prev, price: '0' }));
                    }
                  }}
                />
              </div>
            </label>

            <Input
              type='number'
              placeholder='가격을 입력해주세요'
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              disabled={formData.price === '0'}
            />
            {formData.price && formData.price !== '0' && (
              <div className='text-right text-sm text-gray-600'>
                {parseInt(formData.price).toLocaleString()}원
              </div>
            )}
          </div>

          {/* 메뉴 사진 업로드 */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>메뉴 사진</label>
            <div className='flex gap-2 overflow-x-auto'>
              {images.map((image, index) => (
                <div key={index} className='relative flex-shrink-0'>
                  <img
                    src={image}
                    alt={`메뉴 이미지 ${index + 1}`}
                    className='w-24 h-24 object-cover rounded-lg border'
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className='absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center'
                  >
                    <X className='w-4 h-4' />
                  </button>
                </div>
              ))}

              {images.length < 3 && ( // 최대 3개까지 허용
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='w-24 h-24 border-1 border border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors'
                >
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 3.5H8.3C6.61984 3.5 5.77976 3.5 5.13803 3.82698C4.57354 4.1146 4.1146 4.57354 3.82698 5.13803C3.5 5.77976 3.5 6.61984 3.5 8.3V16.7C3.5 18.3802 3.5 19.2202 3.82698 19.862C4.1146 20.4265 4.57354 20.8854 5.13803 21.173C5.77976 21.5 6.61984 21.5 8.3 21.5H17.5C18.43 21.5 18.895 21.5 19.2765 21.3978C20.3117 21.1204 21.1204 20.3117 21.3978 19.2765C21.5 18.895 21.5 18.43 21.5 17.5M19.5 8.5V2.5M16.5 5.5H22.5M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9ZM15.49 12.4181L7.03115 20.108C6.55536 20.5406 6.31747 20.7568 6.29643 20.9442C6.27819 21.1066 6.34045 21.2676 6.46319 21.3755C6.60478 21.5 6.92628 21.5 7.56929 21.5H16.956C18.3951 21.5 19.1147 21.5 19.6799 21.2582C20.3894 20.9547 20.9547 20.3894 21.2582 19.6799C21.5 19.1147 21.5 18.3951 21.5 16.956C21.5 16.4717 21.5 16.2296 21.4471 16.0042C21.3805 15.7208 21.253 15.4554 21.0733 15.2264C20.9303 15.0442 20.7412 14.8929 20.3631 14.5905L17.5658 12.3527C17.1874 12.0499 16.9982 11.8985 16.7898 11.8451C16.6061 11.798 16.4129 11.8041 16.2325 11.8627C16.0279 11.9291 15.8486 12.0921 15.49 12.4181Z" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className='text-xs text-gray-500 mt-1'>
                    이미지 추가
                    {isUploadingImage && ' (업로드 중...)'}
                  </span>
                  <span className='text-xs text-gray-400'>
                    ({images.length}/3)
                  </span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              multiple
              onChange={handleImageSelect}
              className='hidden'
            />
          </div>

          {/* 메뉴 설명 */}
          <div className='space-y-2'>
            <label className='text-sm font-medium'>메뉴 설명</label>
            <TextArea
              placeholder='메뉴 설명을 입력해주세요'
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              maxLength={50}
            />
          </div>

          {/* 뱃지 선택 */}
        </Dialog.Body>

        <Dialog.Footer>
          <Button variant='outlined' onClick={handleClose} className='flex-1'>
            취소
          </Button>
          <Button
            variant='primary'
            onClick={handleSubmit}
            disabled={createMenuMutation.isPending || isUploadingImage}
            className='flex-1'
          >
            {createMenuMutation.isPending
              ? (mode === 'edit' ? '수정 중...' : '추가 중...')
              : (mode === 'edit' ? '수정' : '추가')
            }
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

// 이전 이름과의 호환성을 위해 AddMenuDialog로도 export
export const AddMenuDialog = MenuDialog;
export default MenuDialog;
