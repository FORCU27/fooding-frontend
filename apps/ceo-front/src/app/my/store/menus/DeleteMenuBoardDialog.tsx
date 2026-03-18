'use client';

import { Button, Dialog } from '@repo/design-system/components/ceo';

interface DeleteMenuBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

const DeleteMenuBoardDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
}: DeleteMenuBoardDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className='max-w-[400px]' showCloseButton={true}>
        <Dialog.Header>
          <Dialog.Title>메뉴판 삭제</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <div className='text-center space-y-4'>
            <p className='text-gray-700'>
              이 메뉴판을 정말 삭제하시겠습니까?
            </p>
            <p className='text-sm text-red-600'>
              삭제된 메뉴판은 복구할 수 없습니다.
            </p>
          </div>
        </Dialog.Body>

        <Dialog.Footer>
          <Button
            variant='outlined'
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className='flex-1'
          >
            취소
          </Button>
          <Button
            variant='primary'
            onClick={onConfirm}
            disabled={isDeleting}
            className='flex-1 bg-red-500 hover:bg-red-600'
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default DeleteMenuBoardDialog;