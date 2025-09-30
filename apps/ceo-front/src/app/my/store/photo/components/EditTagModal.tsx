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
      <h3 className='subtitle-6 text-gray-5 mt-[-16px]'>사진을 잘 설명하는 태그를 골라주세요.</h3>
      <ToggleGroup
        type='multiple'
        value={selectedTags}
        onValueChange={(values) => onChange(values as ImageTag[])}
      >
        <ToggleGroupItem value={ImageTagEnum.PRICE_TAG}>가격표</ToggleGroupItem>
        <ToggleGroupItem value={ImageTagEnum.FOOD}>음식</ToggleGroupItem>
        <ToggleGroupItem value={ImageTagEnum.BEVERAGE}>음료</ToggleGroupItem>
        <ToggleGroupItem value={ImageTagEnum.INTERIOR}>내부</ToggleGroupItem>
        <ToggleGroupItem value={ImageTagEnum.EXTERIOR}>외부</ToggleGroupItem>
      </ToggleGroup>
    </div>
  </ConfirmModal>
);

export default EditTagModal;
