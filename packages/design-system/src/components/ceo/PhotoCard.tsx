'use client';

import { useState } from 'react';

import { KebabButton, PinIcon, PlayVideoIcon } from '../../icons';

type ImageComponentProps = {
  src: string;
  alt: string;
  className?: string;
};

type PhotoCardProps = {
  src: string;
  alt: string;
  flags?: {
    isVideo?: boolean;
    isRepresentative?: boolean;
    showCloseButton?: boolean;
  };
  actions?: {
    onSetRepresentative?: () => void;
    onPlayVideo?: () => void;
    onDelete?: () => void;
    onEditTag?: () => void;
  };
  ImageComponent?: React.ComponentType<ImageComponentProps>;
};

const DefaultImage = ({ src, alt, className }: ImageComponentProps) => (
  <img src={src} alt={alt} className={className} />
);

const ActionMenu = ({
  onSetRepresentative,
  onDelete,
  onClose,
  onEditTag,
}: {
  onSetRepresentative?: () => void;
  onDelete?: () => void;
  onEditTag?: () => void;
  onClose: () => void;
}) => (
  <div
    role='menu'
    className='absolute right-0 mt-[4px] py-[12px] w-[117px] overflow-hidden rounded-md bg-white z-10'
  >
    <button
      role='menuitem'
      className='block w-full px-[16px] py-[4px] body-2 text-left hover:bg-gray-50 cursor-pointer'
      onClick={() => {
        onSetRepresentative?.();
        onClose();
      }}
    >
      대표사진
    </button>
    <button
      role='menuitem'
      className='block w-full px-[16px] py-[4px] body-2 text-left hover:bg-gray-50 cursor-pointer'
      onClick={() => {
        onEditTag?.();
        onClose();
      }}
    >
      태그 수정
    </button>
    <button
      role='menuitem'
      className='block w-full px-[16px] py-[4px] body-2 text-left text-error-red hover:bg-red-50 cursor-pointer'
      onClick={() => {
        onDelete?.();
        onClose();
      }}
    >
      삭제
    </button>
  </div>
);

export function PhotoCard({
  src,
  alt,
  flags,
  actions,
  ImageComponent = DefaultImage,
}: PhotoCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const isVideo = flags?.isVideo;
  const isRepresentative = flags?.isRepresentative;
  const showCloseButton = flags?.showCloseButton;

  const onPlayVideo = actions?.onPlayVideo;
  const onSetRepresentative = actions?.onSetRepresentative;
  const onDelete = actions?.onDelete;
  const onEditTag = actions?.onEditTag;

  return (
    <div className='relative h-fit break-inside-avoid rounded-2xl overflow-hidden bg-white group'>
      {/* 이미지 */}
      <div className='relative w-full'>
        <ImageComponent src={src} alt={alt} className='w-full h-auto object-cover align-middle' />
      </div>

      {/* 대표 사진 뱃지 */}
      {isRepresentative && (
        <div className='absolute left-[22px] top-[20px] flex items-center gap-1 pointer-events-none'>
          <PinIcon />
        </div>
      )}

      {/* 동영상 버튼 */}
      {isVideo && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <button className='cursor-pointer' onClick={onPlayVideo} aria-label='영상 재생'>
            <PlayVideoIcon />
          </button>
        </div>
      )}

      {/* 우측 상단 메뉴 버튼 */}
      <div className='absolute right-[22px] top-[20px]'>
        {showCloseButton ? (
          <>
            <button className='w-[24px] h-[24px] rounded-full bg-[rgba(68,68,68,0.3)] flex items-center justify-center'>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='20' height='20' rx='10' fill='#444444' fillOpacity='0.3' />
                <path
                  d='M14.1693 5.83594L5.83594 14.1693M5.83594 5.83594L14.1693 14.1693'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <KebabButton onClick={toggleMenu} aria-haspopup='true' aria-expanded={isMenuOpen} />
            {isMenuOpen && (
              <ActionMenu
                onSetRepresentative={onSetRepresentative}
                onEditTag={onEditTag}
                onDelete={onDelete}
                onClose={closeMenu}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
