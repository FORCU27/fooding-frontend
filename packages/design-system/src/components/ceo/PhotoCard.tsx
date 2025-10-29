'use client';

import { DropdownMenu } from './DropdownMenu';
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

// const ActionMenu = ({
//   onSetRepresentative,
//   onDelete,
//   onClose,
// }: {
//   onSetRepresentative?: () => void;
//   onDelete?: () => void;
//   onClose: () => void;
// }) => (
//   <div
//     role='menu'
//     className='absolute right-0 mt-[4px] py-[12px] w-[117px] overflow-hidden rounded-md bg-white z-10'
//   >
//     <button
//       role='menuitem'
//       className='block w-full px-[16px] py-[4px] body-2 text-left hover:bg-gray-50 cursor-pointer'
//       onClick={() => {
//         onSetRepresentative?.();
//         onClose();
//       }}
//     >
//       대표사진
//     </button>
//     <button
//       role='menuitem'
//       className='block w-full px-[16px] py-[4px] body-2 text-left text-error-red hover:bg-red-50 cursor-pointer'
//       onClick={() => {
//         onDelete?.();
//         onClose();
//       }}
//     >
//       삭제
//     </button>
//   </div>
// );

export function PhotoCard({
  src,
  alt,
  flags,
  actions,
  ImageComponent = DefaultImage,
}: PhotoCardProps) {
  const isVideo = flags?.isVideo;
  const isRepresentative = flags?.isRepresentative;

  return (
    <div className='relative h-fit break-inside-avoid bg-white group'>
      {/* 이미지 */}
      <div className='relative w-full overflow-hidden rounded-2xl'>
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
          <button className='cursor-pointer' onClick={actions?.onPlayVideo} aria-label='영상 재생'>
            <PlayVideoIcon />
          </button>
        </div>
      )}

      {/* 케밥 메뉴 */}
      <div className='absolute right-[22px] top-[20px]'>
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            {/* TODO 접근성(키보드 접근, aria 속성) 대비 예정 */}
            <div>
              <KebabButton aria-label='메뉴 열기' />
            </div>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content sideOffset={4} side='left' align='start'>
            <DropdownMenu.Item onSelect={actions?.onSetRepresentative}>
              {isRepresentative ? '대표사진 해제' : '대표사진 설정'}
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={actions?.onEditTag}>태그 수정</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={actions?.onDelete} variant='danger'>
              삭제
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default PhotoCard;
