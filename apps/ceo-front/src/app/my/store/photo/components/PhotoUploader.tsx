import { ImageIcon } from '@repo/design-system/icons';

type PhotoUploaderProps = {
  onUploadClick: () => void;
};

const PhotoUploader = ({ onUploadClick }: PhotoUploaderProps) => (
  <div
    className='w-1/2 md:w-60 md:h-60 aspect-square flex items-center justify-center rounded-2xl shadow-sm overflow-hidden bg-white relative flex-col cursor-pointer text-gray-5 p-4 hover:bg-gray-2'
    onClick={onUploadClick}
  >
    <ImageIcon />
    <p className='mt-[4px] subtitle-7'>
      <span className='text-gray-5'>사진을 추가해주세요</span>
    </p>
  </div>
);

export default PhotoUploader;
