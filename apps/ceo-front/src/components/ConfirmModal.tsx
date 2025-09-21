import { Button } from '@repo/design-system/components/ceo';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  open,
  title = '',
  children,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='flex flex-col gap-[24px] relative rounded-4xl bg-white px-[24px] py-8 shadow-lg'>
        {title && <h2 className='subtitle-2 text-center'>{title}</h2>}
        {children && <div className='text-center'>{children}</div>}
        <div className='flex gap-[12px] px-[74px]'>
          <Button onClick={onCancel} variant='outline'>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} variant='primary'>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
