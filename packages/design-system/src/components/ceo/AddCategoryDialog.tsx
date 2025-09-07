'use client';

import { useState, type ReactNode } from 'react';

import { Button } from './Button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './Dialog';
import { Input } from './Input';

type AddCategoryDialogProps = {
  onAdd: (name: string) => void;
  trigger?: ReactNode;
};

export const AddCategoryDialog = ({ onAdd, trigger }: AddCategoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = () => {
    if (categoryName.trim()) {
      onAdd(categoryName.trim());
      setCategoryName('');
      setOpen(false);
    }
  };

  const handleClose = () => {
    setCategoryName('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="w-[400px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-6">
            카테고리 등록
          </DialogTitle>
        </DialogHeader>
        
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

        <DialogFooter className="flex justify-center gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="w-[100px]"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!categoryName.trim()}
            className="w-[100px]"
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};