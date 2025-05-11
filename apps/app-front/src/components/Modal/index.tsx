import React, { useEffect } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
};

export default function Modal({
  open,
  onClose,
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
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-xl p-8 ${className}`}
        onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
      >
        {showCloseButton && (
          <button
            className="absolute top-[30px] right-[30px] text-2xl text-gray-400 hover:text-gray-700"
            onClick={onClose}
            aria-label="닫기"
            type="button"
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 15L15 45M15 15L45 45" stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
}