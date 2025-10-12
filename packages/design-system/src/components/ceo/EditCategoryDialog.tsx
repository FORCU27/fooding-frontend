'use client';

import { useState, useEffect } from 'react';

import { Button } from './Button';
import { Dialog } from './Dialog';
import { Input } from './Input';

type EditCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName: string;
  onSave: (name: string) => void;
  onDelete?: () => void;
};

export const EditCategoryDialog = ({ 
  open, 
  onOpenChange, 
  categoryName: initialName,
  onSave,
  onDelete 
}: EditCategoryDialogProps) => {
  const [categoryName, setCategoryName] = useState(initialName);

  useEffect(() => {
    setCategoryName(initialName);
  }, [initialName]);

  const handleSubmit = () => {
    if (categoryName.trim() && categoryName.trim() !== initialName) {
      onSave(categoryName.trim());
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('이 카테고리를 삭제하시겠습니까?')) {
      onDelete();
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setCategoryName(initialName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="w-[400px]" showCloseButton={false}>
        <Dialog.Header>
          <Dialog.Title className="text-center text-xl font-bold mb-6">
            카테고리 수정
          </Dialog.Title>
        </Dialog.Header>
        
        <div className="py-4">
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="카테고리명을 입력해주세요"
            className="w-full"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </div>

        <Dialog.Footer className="flex justify-center gap-3">
          {onDelete && (
            <Button
              type="button"
              variant="outlined"
              onClick={handleDelete}
              className="w-[80px] text-red-500 border-red-500 hover:bg-red-50"
            >
              삭제
            </Button>
          )}
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose}
            className="w-[80px]"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!categoryName.trim() || categoryName.trim() === initialName}
            className="w-[80px]"
          >
            수정
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};