'use client';

import { useState, useRef } from 'react';

import { menuApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { fileApi } from '@repo/api/file';
import { Dialog, Button, Input, TextArea, Checkbox } from '@repo/design-system/components/ceo';
import { ImageIcon, X } from '@repo/design-system/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

interface AddMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: number;
}

const AddMenuDialog = ({ open, onOpenChange, categoryId }: AddMenuDialogProps) => {
  const queryClient = useQueryClient();
  const { selectedStoreId } = useSelectedStoreId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    isSignature: false,
    isRecommend: false,
    isNew: false,
  });

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // 이미지 업로드 함수
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file); // 서버는 'files' 파라미터를 기대함

    try {
      setIsUploadingImage(true);
      const response = await fileApi.upload(formData);

      // 응답에서 첫 번째 파일의 id 반환
      if (response.data && response.data.length > 0) {
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

      let imageId = uploadedImageId;

      // 이미지가 있지만 아직 업로드하지 않은 경우
      if (imageFiles.length > 0 && !uploadedImageId) {
        try {
          imageId = await uploadImage(imageFiles[0]);
          setUploadedImageId(imageId);
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          // 이미지 업로드 실패해도 메뉴는 생성 가능
        }
      }

      // 메뉴 생성
      const response = await menuApi.createMenu({
        storeId: selectedStoreId,
        categoryId,
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description || undefined, // 메뉴 설명 추가
        sortOrder: 0, // API에서 자동 정렬
        isSignature: formData.isSignature,
        isRecommend: formData.isRecommend,
        ...(imageId && { imageId }), // imageId가 있을 경우에만 추가
      });

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

    // 첫 번째 이미지만 대표 이미지로 업로드 (아직 업로드하지 않은 경우)
    if (!uploadedImageId && newFiles.length > 0) {
      try {
        const imageId = await uploadImage(newFiles[0]);
        if (imageId) {
          setUploadedImageId(imageId);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  const handleRemoveImage = async (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);

    // 첫 번째 이미지(대표 이미지)를 삭제한 경우
    if (index === 0) {
      setUploadedImageId(null);

      // 남은 이미지가 있으면 그 중 첫 번째를 새로운 대표 이미지로 업로드
      if (updatedFiles.length > 0) {
        try {
          const imageId = await uploadImage(updatedFiles[0]);
          if (imageId) {
            setUploadedImageId(imageId);
          }
        } catch (error) {
          console.error('대체 이미지 업로드 실패:', error);
        }
      }
    }
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!formData.name.trim()) {
      alert('메뉴명을 입력해주세요.');
      return;
    }

    const price = parseInt(formData.price);
    if (isNaN(price) || price <= 0) {
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
    setUploadedImageId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className='max-w-[600px] max-h-[80vh]' showCloseButton={true}>
        <Dialog.Header>
          <Dialog.Title>메뉴 추가</Dialog.Title>
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
          <Button variant='secondary' onClick={handleClose} className='flex-1'>
            취소
          </Button>
          <Button
            variant='primary'
            onClick={handleSubmit}
            disabled={createMenuMutation.isPending || isUploadingImage}
            className='flex-1'
          >
            {createMenuMutation.isPending ? '추가 중...' : '저장'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default AddMenuDialog;
