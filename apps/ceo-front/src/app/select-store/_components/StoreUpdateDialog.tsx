import { useState } from 'react';

import { Store } from '@repo/api/ceo';
import { Button, Dialog, Input } from '@repo/design-system/components/ceo';

import { useUpdateStore } from '@/hooks/store/useUpdateStore';

type StoreUpdateDialogProps = {
  store: Store;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const StoreUpdateDialog = ({ store, isOpen, onOpenChange }: StoreUpdateDialogProps) => {
  const [storeName, setStoreName] = useState(store.name);

  const updateStoreMutation = useUpdateStore();

  const onConfirmButtonClick = () => {
    if (updateStoreMutation.isPending) return;

    // TODO: 수정 기능 추가
    onOpenChange(false);

    // updateStoreMutation.mutate(
    //   {
    //     id: store.id,
    //     body: {
    //       address: store.address,
    //       latitude: store.latitude,
    //       longitude: store.longitude,
    //       category: store.category,
    //       contactNumber: store.contactNumber,
    //       direction: store.direction,
    //       description: store.description,
    //       name: storeName,
    //     },
    //   },
    //   {
    //     onSuccess: () => {
    //       onOpenChange(false);
    //     },
    //     onError: () => {
    //       // TODO: 에러 처리
    //     },
    //   },
    // );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>매장 수정</Dialog.Title>
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
            확인
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
