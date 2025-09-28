'use client';

import React from 'react';

type ImageComponentProps = {
  src: string;
  alt: string;
  className?: string;
};

type MenuPanImage = {
  id: string;
  url: string;
  file?: File;
};

type MenuPanProps = {
  images: MenuPanImage[];
  onImagesChange: (images: MenuPanImage[]) => void;
  onDeleteImage?: (imageId: string) => void;
  maxImages?: number;
  ImageComponent?: React.ComponentType<ImageComponentProps>;
};

const DefaultImage = ({ src, alt, className }: ImageComponentProps) => (
  <img src={src} alt={alt} className={className} />
);

const MenuPanImageCard = ({
  image,
  onDelete,
  ImageComponent = DefaultImage,
}: {
  image: MenuPanImage;
  onDelete: () => void;
  ImageComponent?: React.ComponentType<ImageComponentProps>;
}) => {
  return (
    <div className='relative aspect-[3/2] rounded-2xl overflow-hidden bg-white group'>
      {/* 이미지 */}
      <div className='relative w-full h-full'>
        <ImageComponent
          src={image.url}
          alt='메뉴판 이미지'
          className='w-full h-full object-cover'
        />
      </div>

      {/* 우측 상단 삭제 버튼 */}
      <div className='absolute right-[12px] top-[12px]'>
        <button
          onClick={onDelete}
          className='w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all'
          aria-label='이미지 삭제'
        >
          {/* 삭제 SVG 아이콘 */}
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='text-white'>
            <path
              d='M12 4L4 12M4 4L12 12'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export function MenuPan({
  images,
  onImagesChange,
  onDeleteImage,
  maxImages = 8,
  ImageComponent = DefaultImage,
}: MenuPanProps) {
  const handleDeleteImage = (targetId: string) => {
    if (onDeleteImage) {
      // 외부 삭제 함수가 있으면 그것을 사용 (API 호출 포함)
      onDeleteImage(targetId);
    } else {
      // 기본 로컬 삭제
      const updatedImages = images.filter((img) => img.id !== targetId);
      onImagesChange(updatedImages);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    if (filesToProcess.length === 0) {
      alert(`최대 ${maxImages}개까지 이미지를 업로드할 수 있습니다.`);
      return;
    }

    // 여기서는 파일 선택만 처리하고, 실제 업로드는 부모 컴포넌트에서 처리
    const newImages: MenuPanImage[] = filesToProcess.map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      file,
    }));

    onImagesChange([...images, ...newImages]);

    // input 초기화
    e.target.value = '';
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>메뉴판 사진</h3>
      </div>

      {/* 동적 그리드 */}
      <div className='grid grid-cols-4 gap-4'>
        {images.map((image) => (
          <MenuPanImageCard
            key={image.id}
            image={image}
            onDelete={() => handleDeleteImage(image.id)}
            ImageComponent={ImageComponent}
          />
        ))}

        {/* 업로드 버튼 - 최대 개수에 도달하지 않았을 때만 하나만 표시 */}
        {images.length < maxImages && (
          <div className='relative'>
            <label className='w-full aspect-[3/2] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer'>
              {/* 사진 SVG 아이콘 */}
              <svg
                width='32'
                height='32'
                viewBox='0 0 24 24'
                fill='none'
                className='text-gray-400 mb-2'
              >
                <path
                  d='M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z'
                  fill='currentColor'
                />
              </svg>
              <span className='text-xs text-gray-400 mt-1'>
                {images.length}/{maxImages}
              </span>
              <input
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileSelect}
                className='hidden'
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuPan;
