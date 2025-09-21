import { Button, Dialog } from '@repo/design-system/components/ceo';

import { useDeleteStore } from '@/hooks/store/useDeleteStore';

type StoreDeleteDialogProps = {
  storeId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const StoreDeleteDialog = ({ storeId, isOpen, onOpenChange }: StoreDeleteDialogProps) => {
  const deleteStoreMutation = useDeleteStore();

  const onConfirmButtonClick = () => {
    if (deleteStoreMutation.isPending) return;

    deleteStoreMutation.mutate(storeId, {
      onSuccess: () => {
        onOpenChange(false);
      },
      onError: () => {
        // TODO: 에러 처리
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>등록된 매장을 삭제하시겠습니까?</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant='outlined'>취소</Button>
          </Dialog.Close>
          <Button onClick={onConfirmButtonClick}>삭제</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
