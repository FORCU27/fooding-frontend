'use client';

import { useState, useRef } from 'react';

import { menuApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { fileApi } from '@repo/api/file';
import { Dialog, Button, Input, TextArea, Checkbox } from '@repo/design-system/components/ceo';
import { ImageIcon, X } from '@repo/design-system/icons';
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
  // URL에서 이미지 ID 추출 함수
  const extractImageIdFromUrl = (url: string): string => {
    // URL 예시: https://d27gz6v6wvae1d.cloudfront.net/fooding/gigs/1759048292595-pexels-amberontheroad-13397143.jpg
    const fileName = url.split('/').pop(); // 마지막 부분 추출
    if (fileName) {
      const idWithoutExtension = fileName.split('.')[0]; // 확장자 제거
      return idWithoutExtension || url;
    }
    return url; // 실패시 원본 URL 반환
  };

  // 기존 이미지 URL들을 이미지 ID로 변환
  const [existingImageIds] = useState<string[]>(
    menuItem?.imageUrls?.map(extractImageIdFromUrl) || []
  );
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
                  <ImageIcon className='w-8 h-8 text-gray-400' />
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
