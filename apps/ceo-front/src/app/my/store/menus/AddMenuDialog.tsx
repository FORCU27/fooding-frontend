'use client';

import { useState, useRef } from 'react';

import { menuApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  // TODO: 이미지 업로드 API 연동 시 imageFiles 사용 예정

  // 메뉴 생성 mutation
  const createMenuMutation = useMutation({
    mutationFn: async () => {
      if (!selectedStoreId) throw new Error('스토어가 선택되지 않았습니다.');

      // 먼저 메뉴 생성
      const response = await menuApi.createMenuItem({
        storeId: selectedStoreId,
        categoryId,
        name: formData.name,
        price: parseInt(formData.price),
        sortOrder: 0, // API에서 자동 정렬
        isSignature: formData.isSignature,
        isRecommend: formData.isRecommend,
      });

      // TODO: 이미지 업로드 API 연동
      // if (imageFiles.length > 0) {
      //   await uploadMenuImages(response.id, imageFiles);
      // }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.menu.list, categoryId],
      });
      handleClose();
    },
    onError: (error) => {
      console.error('메뉴 추가 실패:', error);
      alert('메뉴 추가에 실패했습니다.');
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target?.result as string]);
        setImageFiles((prev) => [...prev, file]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
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
                      checked={formData.isSignature}
                      onChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isSignature: checked }))
                      }
                    />
                    <span className='text-sm'>대표</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <Checkbox
                      checked={formData.isRecommend}
                      onChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isRecommend: checked }))
                      }
                    />
                    <span className='text-sm'>추천</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <Checkbox
                      checked={formData.isNew}
                      onChange={(checked) => setFormData((prev) => ({ ...prev, isNew: checked }))}
                    />
                    <span className='text-sm'>신규</span>
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
                  checked={formData.price === '0'}
                  onChange={(checked) => {
                    if (checked) {
                      setFormData((prev) => ({ ...prev, price: '0' }));
                    }
                  }}
                />
                <span className='text-sm'>변동가격</span>
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

              {images.length < 3 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className='w-24 h-24 border-1 border border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors'
                >
                  <ImageIcon className='w-8 h-8 text-gray-400' />
                  <span className='text-xs text-gray-500 mt-1'>{images.length} / 3</span>
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
            disabled={createMenuMutation.isPending}
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
