'use client';

import { PhotoCard, Pagination } from '@repo/design-system/components/ceo';

type PhotoListProps = {
  photos: { id: number; imageUrl: string; isMain: boolean }[];
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
  onDelete: (id: number) => void;
  onEditTag: (id: number) => void;
  onToggleMain: (id: number, isMain: boolean) => void;
};

const PhotoList = ({
  photos,
  page,
  totalPages,
  onChangePage,
  onDelete,
  onEditTag,
  onToggleMain,
}: PhotoListProps) => (
  <div className='flex flex-col pb-[80px]'>
    <div className='columns-2 md:columns-4 gap-[20px] pb-[200px]'>
      {photos.map((photo) => (
        <div key={photo.id} className='mb-[20px] break-inside-avoid'>
          <PhotoCard
            src={photo.imageUrl}
            alt='photo image'
            flags={{ isRepresentative: photo.isMain }}
            actions={{
              onDelete: () => onDelete(photo.id),
              onEditTag: () => onEditTag(photo.id),
              onSetRepresentative: () => onToggleMain(photo.id, !photo.isMain),
            }}
          />
        </div>
      ))}
    </div>
    <Pagination page={page} total={totalPages} onChange={onChangePage} className='justify-center' />
  </div>
);

export default PhotoList;
