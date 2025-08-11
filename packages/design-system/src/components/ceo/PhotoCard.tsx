'use client';

import Image from 'next/image';
import { useState } from 'react';

type PhotoCardProps = {
  src: string;
  alt: string;
  // 이미지가 세로로 길 수도 있으니 가변 높이를 허용
  // width는 container가 결정, height는 자연 높이에 맡기고 object-cover로 잘라냄
  isVideo?: boolean;
  isRepresentative?: boolean;
  isBookmarked?: boolean;
  onSetRepresentative?: () => void;
  onDelete?: () => void;
  onToggleBookmark?: () => void;
};

export default function PhotoCard({
  src,
  alt,
  isVideo,
  isRepresentative,
  isBookmarked,
  onSetRepresentative,
  onDelete,
  onToggleBookmark,
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
      {/* 이미지: 가변 높이, 가로는 부모 컬럼 폭에 맞춤 */}
      <div className='relative w-full'>
        {/* 레이아웃 쉬프트 줄이려면 sizes 지정 */}
        <Image
          src={src}
          alt={alt}
          width={800}
          height={1000}
          sizes='(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw'
          className='w-full h-auto object-cover align-middle'
          priority={false}
        />
      </div>

      {/* 좌상단 배지(대표/즐겨찾기 등) */}
      <div className='absolute left-2 top-2 flex items-center gap-1 pointer-events-none'>
        {isRepresentative && (
          <span className='rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-gray-900 shadow'>
            대표사진
          </span>
        )}
        {isBookmarked && (
          <span className='rounded-full bg-white/90 p-1 shadow'>
            {/* 별 아이콘 대체 */}
            <svg width='14' height='14' viewBox='0 0 24 24' fill='#8B5CF6' aria-hidden='true'>
              <path d='M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
            </svg>
          </span>
        )}
      </div>

      {/* 동영상 재생 오버레이 */}
      {isVideo && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='rounded-full bg-black/40 p-3'>
            <svg width='28' height='28' viewBox='0 0 24 24' fill='white' aria-hidden='true'>
              <path d='M8 5v14l11-7z' />
            </svg>
          </div>
        </div>
      )}

      {/* 우상단 케밥 버튼 */}
      <div className='absolute right-2 top-2'>
        <button
          type='button'
          aria-haspopup='menu'
          aria-expanded={open}
          className='rounded-md bg-white/90 p-1 shadow hover:bg-white'
          onClick={() => setOpen((v) => !v)}
        >
          {/* ⋮ 아이콘 */}
          <svg width='18' height='18' viewBox='0 0 24 24' fill='#6B7280' aria-hidden='true'>
            <circle cx='12' cy='5' r='2' />
            <circle cx='12' cy='12' r='2' />
            <circle cx='12' cy='19' r='2' />
          </svg>
        </button>

        {open && (
          <div
            role='menu'
            className='absolute right-0 mt-2 w-36 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg z-10'
          >
            <button
              role='menuitem'
              className='block w-full px-3 py-2 text-left text-sm hover:bg-gray-50'
              onClick={() => {
                onSetRepresentative?.();
                setOpen(false);
              }}
            >
              대표사진으로 지정
            </button>
            <button
              role='menuitem'
              className='block w-full px-3 py-2 text-left text-sm hover:bg-gray-50'
              onClick={() => {
                onToggleBookmark?.();
                setOpen(false);
              }}
            >
              {isBookmarked ? '즐겨찾기 해제' : '즐겨찾기'}
            </button>
            <button
              role='menuitem'
              className='block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50'
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
