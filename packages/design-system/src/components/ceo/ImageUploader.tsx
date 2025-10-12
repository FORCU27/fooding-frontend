import React, { useRef, useState } from 'react';

import { ImagePlus, X } from 'lucide-react';

import { cn } from '../../utils';

type ImageComponentProps = {
  src: string;
  alt: string;
  className?: string;
};

type ImageUploaderProps = {
  position?: 'left' | 'right';
  images?: string[];
  maxImages?: number;
  className?: string;
  onChange?: (images: string[]) => void;
  ImageComponent?: React.ComponentType<ImageComponentProps>;
};

const ImageUploader = ({
  position = 'left',
  images: controlledImages,
  maxImages = 8,
  className,
  onChange,
  ImageComponent,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [defaultImages, setDefaultImages] = useState<string[]>([]);

  const images = controlledImages ?? defaultImages;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (images.length >= maxImages) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images, reader.result as string];
      if (controlledImages) {
        onChange?.(newImages);
      } else {
        setDefaultImages(newImages);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    if (controlledImages) {
      onChange?.(newImages);
    } else {
      setDefaultImages(newImages);
    }
  };

  const renderPreview = (src: string, index: number) =>
    ImageComponent ? (
      <ImageComponent
        key={index}
        src={src}
        alt={`업로드 이미지 미리보기 ${index + 1}`}
        className='w-full h-full object-cover'
      />
    ) : (
      <img
        key={index}
        src={src}
        alt={`업로드 이미지 미리보기 ${index + 1}`}
        className='w-full h-full object-cover'
      />
    );

  const showUploader = images.length < maxImages;

  const items = showUploader
    ? position === 'left'
      ? [null, ...images]
      : [...images, null]
    : images;

  const renderItem = (item: string | null, index: number) => {
    const baseClass =
      'size-60 flex items-center justify-center rounded-[20px] overflow-hidden bg-white relative shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)]';

    if (item === null) {
      return (
        <div
          key='uploader'
          className={`${baseClass} flex-col cursor-pointer text-gray-5 p-4 hover:bg-gray-7`}
          onClick={handleClick}
        >
          <ImagePlus size={24} />
          <p className='mt-2 subtitle-7'>
            <span className='text-gray-6'>{images.length}</span> / {maxImages}
          </p>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleFileChange}
          />
        </div>
      );
    }

    const imageIndex = images.indexOf(item);

    return (
      <div key={index} className={baseClass}>
        {renderPreview(item, imageIndex)}
        <button
          type='button'
          onClick={() => handleRemove(imageIndex)}
          className={cn(
            'size-6 p-1',
            'flex justify-between items-center cursor-pointer',
            'text-white rounded-full bg-[#444444]/30 hover:bg-[#444444]/50',
            'absolute top-5 right-5',
          )}
        >
          <X />
        </button>
      </div>
    );
  };

  return (
    <div
      className={`p-8 rounded-xl shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)] ${className}`}
    >
      <div className='flex flex-wrap gap-5'>{items.map((item, idx) => renderItem(item, idx))}</div>
    </div>
  );
};

export { ImageUploader };
