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
  isVideo?: boolean;
  isBookmarked?: boolean;
  onSetRepresentative?: () => void;
  onDelete?: () => void;
  onToggleBookmark?: () => void;
  ImageComponent?: React.ComponentType<ImageComponentProps>;
};

function DefaultImage({ src, alt, className }: ImageComponentProps) {
  return <img src={src} alt={alt} className={className} />;
}

export default function PhotoCard({
  src,
  alt,
  isVideo,
  isBookmarked,
  onSetRepresentative,
  onDelete,
  onToggleBookmark,
  ImageComponent = DefaultImage,
}: PhotoCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className='
        relative mb-4 break-inside-avoid rounded-2xl overflow-hidden
        shadow-sm ring-1 ring-gray-200 bg-white
        group
      '
    >
      {/* 이미지는 가변 높이, 가로는 부모 컬럼 폭에 맞춤 */}
      <div className='relative w-full'>
        <ImageComponent src={src} alt={alt} className='w-full h-auto object-cover align-middle' />
      </div>

      <div className='absolute left-[22px] top-[20px] flex items-center gap-1 pointer-events-none'>
        {isBookmarked && <PinIcon />}
      </div>

      {/* 동영상 재생 버튼 */}
      {isVideo && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <button className='cursor-pointer'>
            <PlayVideoIcon />
          </button>
        </div>
      )}

      {/* 우상단 케밥 버튼 */}
      <div className='absolute right-[22px] top-[20px]'>
        <KebabButton onClick={() => setOpen((v) => !v)} />
        {open && (
          <div
            role='menu'
            className='absolute right-0 mt-[4px] py-[12px] w-[117px] overflow-hidden rounded-md bg-white z-10'
          >
            <button
              role='menuitem'
              className='block w-full px-[16px] py-[4px] body-2 text-left hover:bg-gray-50 cursor-pointer'
              onClick={() => {
                // onSetRepresentative?.();
                onToggleBookmark?.();
                setOpen(false);
              }}
            >
              대표사진
            </button>
            <button
              role='menuitem'
              className='block w-full px-[16px] py-[4px] body-2 text-left text-error-red hover:bg-red-50 cursor-pointer'
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
