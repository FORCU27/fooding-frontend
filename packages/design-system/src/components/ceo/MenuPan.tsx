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
    <div className='relative aspect-[2/2] rounded-2xl overflow-hidden bg-white group'>
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
          <div className='relative aspect-[2/2]'>
            <label
              className='w-full h-full flex flex-row justify-center items-center p-[18px] gap-[10px] bg-white rounded-[20px] cursor-pointer'
              style={{
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className='flex flex-col items-center justify-center'>
                {/* 사진 SVG 아이콘 */}
                <svg
                  width='25'
                  height='25'
                  viewBox='0 0 25 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M13 3.5H8.3C6.61984 3.5 5.77976 3.5 5.13803 3.82698C4.57354 4.1146 4.1146 4.57354 3.82698 5.13803C3.5 5.77976 3.5 6.61984 3.5 8.3V16.7C3.5 18.3802 3.5 19.2202 3.82698 19.862C4.1146 20.4265 4.57354 20.8854 5.13803 21.173C5.77976 21.5 6.61984 21.5 8.3 21.5H17.5C18.43 21.5 18.895 21.5 19.2765 21.3978C20.3117 21.1204 21.1204 20.3117 21.3978 19.2765C21.5 18.895 21.5 18.43 21.5 17.5M19.5 8.5V2.5M16.5 5.5H22.5M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9ZM15.49 12.4181L7.03115 20.108C6.55536 20.5406 6.31747 20.7568 6.29643 20.9442C6.27819 21.1066 6.34045 21.2676 6.46319 21.3755C6.60478 21.5 6.92628 21.5 7.56929 21.5H16.956C18.3951 21.5 19.1147 21.5 19.6799 21.2582C20.3894 20.9547 20.9547 20.3894 21.2582 19.6799C21.5 19.1147 21.5 18.3951 21.5 16.956C21.5 16.4717 21.5 16.2296 21.4471 16.0042C21.3805 15.7208 21.253 15.4554 21.0733 15.2264C20.9303 15.0442 20.7412 14.8929 20.3631 14.5905L17.5658 12.3527C17.1874 12.0499 16.9982 11.8985 16.7898 11.8451C16.6061 11.798 16.4129 11.8041 16.2325 11.8627C16.0279 11.9291 15.8486 12.0921 15.49 12.4181Z'
                    stroke='#767676'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <span className='text-xs text-gray-400 mt-1'>
                  {images.length}/{maxImages}
                </span>
              </div>
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
