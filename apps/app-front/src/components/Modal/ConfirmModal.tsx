import { CloseIcon } from '@repo/design-system/icons';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ConfirmModal = ({
  open,
  title = '',
  children,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  onClose,
}: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative w-[660px] rounded-4xl bg-white px-6 py-8 shadow-lg'>
        <button
          className='absolute top-[30px] right-[35px]'
          onClick={onClose}
          aria-label='close button'
          type='button'
        >
          <CloseIcon size={60} />
        </button>
        {title && <h2 className='headline-5 text-center'>{title}</h2>}
        <div className='text-center'>{children}</div>
        <div className='flex gap-[20px]'>
          <button
            onClick={onCancel}
            className='flex-1 rounded-full border border-gray-3 py-[20px] subtitle-2-2 text-gray-5'
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className='flex-1 rounded-full bg-primary-pink py-[20px] subtitle-2-2 text-white'
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
