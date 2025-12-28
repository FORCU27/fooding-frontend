'use client';

import { ImageTag, ImageTagEnum } from '@repo/api/ceo';
import { ToggleGroup, ToggleGroupItem } from '@repo/design-system/components/ceo';

import ConfirmModal from '@/components/ConfirmModal';

type EditTagModalProps = {
  open: boolean;
  selectedTags: ImageTag[];
  onChange: (tags: ImageTag[]) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const EditTagModal = ({ open, selectedTags, onChange, onConfirm, onCancel }: EditTagModalProps) => (
  <ConfirmModal
    open={open}
    title='태그 수정'
    confirmLabel='확인'
    cancelLabel='취소'
    onCancel={onCancel}
    onConfirm={onConfirm}
  >
    <div className='flex flex-col gap-[24px]'>
      <h3 className='body-6 text-gray-5 mt-[-16px]'>사진을 잘 설명하는 태그를 골라주세요.</h3>
      <ToggleGroup
        type='multiple'
        value={selectedTags}
        onValueChange={(values) => onChange(values as ImageTag[])}
      >
        <ToggleGroupItem
          value={ImageTagEnum.PRICE_TAG}
          className='h-[42px] bg-gray-100 border-0 rounded-[40px] px-[15px] py-[10px] flex-1 body-2 text-gray-5 whitespace-nowrap 
          data-[state=on]:bg-white data-[state=on]:text-fooding-purple data-[state=on]:border-fooding-purple data-[state=on]:border-1'
        >
          가격표
        </ToggleGroupItem>
        <ToggleGroupItem
          value={ImageTagEnum.FOOD}
          className='h-[42px] bg-gray-100 border-0 rounded-[40px] px-[15px] py-[10px] flex-1 body-2 text-gray-5 whitespace-nowrap 
          data-[state=on]:bg-white data-[state=on]:text-fooding-purple data-[state=on]:border-fooding-purple data-[state=on]:border-1'
        >
          음식
        </ToggleGroupItem>
        <ToggleGroupItem
          value={ImageTagEnum.BEVERAGE}
          className='h-[42px] bg-gray-100 border-0 rounded-[40px] px-[15px] py-[10px] flex-1 body-2 text-gray-5 whitespace-nowrap 
          data-[state=on]:bg-white data-[state=on]:text-fooding-purple data-[state=on]:border-fooding-purple data-[state=on]:border-1'
        >
          음료
        </ToggleGroupItem>
        <ToggleGroupItem
          value={ImageTagEnum.INTERIOR}
          className='h-[42px] bg-gray-100 border-0 rounded-[40px] px-[15px] py-[10px] flex-1 body-2 text-gray-5 whitespace-nowrap 
          data-[state=on]:bg-white data-[state=on]:text-fooding-purple data-[state=on]:border-fooding-purple data-[state=on]:border-1'
        >
          내부
        </ToggleGroupItem>
        <ToggleGroupItem
          value={ImageTagEnum.EXTERIOR}
          className='h-[42px] bg-gray-100 border-0 rounded-[40px] px-[15px] py-[10px] flex-1 body-2 text-gray-5 whitespace-nowrap 
          data-[state=on]:bg-white data-[state=on]:text-fooding-purple data-[state=on]:border-fooding-purple data-[state=on]:border-1'
        >
          외부
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  </ConfirmModal>
);

export default EditTagModal;
