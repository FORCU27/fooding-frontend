import React, { useEffect } from 'react';

import { ArrowLeftIcon, CloseIcon } from '@repo/design-system/icons';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  backBtn?: boolean;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
};

export default function Modal({
  open,
  onClose,
  backBtn = false,
  children,
  className = '',
  overlayClassName = '',
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 ${overlayClassName}`}
      onClick={closeOnOverlayClick ? onClose : undefined}
      aria-modal='true'
      role='dialog'
      tabIndex={-1}
    >
      <div
        className={`fixed inset-y-[20px] inset-x-[310px] bg-white rounded-[40px] flex items-center justify-center ${className}`}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
      >
        {backBtn && (
          <button
            className='absolute top-[30px] left-[30px] text-2xl text-gray-400 hover:text-gray-700'
            onClick={onClose}
            aria-label='닫기'
            type='button'
          >
            <ArrowLeftIcon />
          </button>
        )}
        {showCloseButton && (
          <button
            className='absolute top-[30px] right-[30px] text-2xl text-gray-400 hover:text-gray-700'
            onClick={onClose}
            aria-label='닫기'
            type='button'
          >
            <CloseIcon />
          </button>
        )}
        <div className='w-full h-full flex items-center justify-center'>{children}</div>
      </div>
    </div>
  );
}
