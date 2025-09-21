import { useState } from 'react';

import { Button, Dialog, Input } from '@repo/design-system/components/ceo';

import { useCreateStore } from '@/hooks/store/useCreateStore';

type StoreCreateDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const StoreCreateDialog = ({ isOpen, onOpenChange }: StoreCreateDialogProps) => {
  const [storeName, setStoreName] = useState('');

  const createStoreMutation = useCreateStore();

  const onConfirmButtonClick = () => {
    if (createStoreMutation.isPending) return;

    createStoreMutation.mutate(
      { name: storeName.trim() },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: () => {
          // TODO: 에러 처리
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>매장 등록</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <Input
            placeholder='매장명을 입력해주세요'
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Button
            variant='primaryPink'
            onClick={onConfirmButtonClick}
            disabled={storeName.trim().length === 0}
          >
            등록
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
