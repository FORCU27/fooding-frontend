'use client';

import { Button, Dialog } from '@repo/design-system/components/ceo';

interface DeleteMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuName: string;
  onConfirm: () => void;
  isDeleting?: boolean;
}

const DeleteMenuDialog = ({
  open,
  onOpenChange,
  menuName,
  onConfirm,
  isDeleting = false,
}: DeleteMenuDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className='max-w-[400px]' showCloseButton={true}>
        <Dialog.Header>
          <Dialog.Title>메뉴 삭제</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <div className='text-center space-y-4'>
            <p className='text-gray-700'>
              <span className='font-semibold text-gray-900'>"{menuName}"</span> 메뉴를
              <br />
              정말 삭제하시겠습니까?
            </p>
            <p className='text-sm text-red-600'>
              삭제된 메뉴는 복구할 수 없습니다.
            </p>
          </div>
        </Dialog.Body>

        <Dialog.Footer>
          <Button
            variant='secondary'
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

export default DeleteMenuDialog;