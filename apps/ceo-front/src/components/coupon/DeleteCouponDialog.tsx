'use client';

import { Dialog, Button } from '@repo/design-system/components/ceo';

interface DeleteCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  couponName: string;
  isDeleting: boolean;
  onConfirm: () => void;
}

export const DeleteCouponDialog = ({
  open,
  onOpenChange,
  couponName,
  isDeleting,
  onConfirm,
}: DeleteCouponDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className='max-w-[400px]'>
        <Dialog.Header>
          <Dialog.Title>쿠폰 삭제</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <div className='space-y-4'>
            <p className='text-gray-700'>
              <span className='font-semibold'>{couponName}</span> 쿠폰을 삭제하시겠습니까?
            </p>
            <p className='text-sm text-gray-500'>이 작업은 되돌릴 수 없습니다.</p>
          </div>
        </Dialog.Body>

        <Dialog.Footer>
          <Button variant='outlined' onClick={() => onOpenChange(false)} disabled={isDeleting}>
            취소
          </Button>
          <Button variant='primary' onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '확인'}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default DeleteCouponDialog;
