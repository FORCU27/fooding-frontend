import { StarIcon } from '@repo/design-system/icons';

export interface ReviewCardProps {
  author: string;
  date: string;
  rating?: number;
  content: string;
  images?: string[];
  children?: React.ReactNode;
}

export const ProfileImage = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='20' cy='20' r='20' fill='#F1F3F5' />
    <path
      d='M19.9979 23C16.8278 23 14.0087 24.5306 12.2139 26.906C11.8276 27.4172 11.6345 27.6728 11.6408 28.0183C11.6457 28.2852 11.8133 28.6219 12.0233 28.7867C12.2951 29 12.6718 29 13.4251 29H26.5707C27.324 29 27.7007 29 27.9725 28.7867C28.1825 28.6219 28.3501 28.2852 28.355 28.0183C28.3613 27.6728 28.1682 27.4172 27.7819 26.906C25.9871 24.5306 23.168 23 19.9979 23Z'
      stroke='#BEBEBE'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M19.9979 20C22.4832 20 24.4979 17.9853 24.4979 15.5C24.4979 13.0147 22.4832 11 19.9979 11C17.5126 11 15.4979 13.0147 15.4979 15.5C15.4979 17.9853 17.5126 20 19.9979 20Z'
      stroke='#BEBEBE'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ReviewCard = ({ author, date, rating, content, images, children }: ReviewCardProps) => {
  return (
    <div className='flex flex-col items-center gap-[20px]'>
      <div className='rounded-[20px] shadow-[0_0_2px_rgba(0,0,0,0.06),0_0_3px_rgba(0,0,0,0.1)] pt-[32px] px-[32px] pb-[40px] bg-white'>
        <ReviewCard.Header author={author} date={date} rating={rating} />
        <ReviewCard.Content content={content} images={images} />
        {children}
      </div>
    </div>
  );
};

const ReviewCardHeader = ({ author, date, rating }: any) => (
  <div className='flex justify-between items-center mb-[20px]'>
    <div className='flex gap-[12px]'>
      <ProfileImage />
      <div className='flex flex-col gap-[2px]'>
        <span className='subtitle-2 leading-[24px]'>{author}</span>
        <span className='text-gray-5 body-5 leading-[16px]'>리뷰 10 팔로워 100</span>
      </div>
    </div>
    <div className='flex flex-col items-end gap-[2px] py-[3px]'>
      <span className='body-5 text-gray-5 leading-[17px]'>{date}</span>
      <div className='flex gap-[2px]'>
        {Array.from({ length: 5 }).map((_, index) => {
          const isActive = index < rating;
          return (
            <StarIcon
              key={index}
              size={15}
              color={isActive ? '#FFD83D' : '#E2DFDF'} // 노란색 / 회색
              fill={isActive ? '#FFD83D' : '#E2DFDF'}
              stroke={isActive ? '#FFD83D' : '#E2DFDF'}
            />
          );
        })}
      </div>
    </div>
  </div>
);

const IMG =
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop';

const ReviewCardContent = ({ content }: any) => (
  <div>
    <p className='body-2 font-normal whitespace-pre-line'>{content}</p>
    {/* {images?.length > 0 ? (
      <div className='mt-[20px] grid grid-cols-4 gap-[20px]'>
        {images.map((src) => (
          <img key={src} src={IMG} alt='' className='rounded-md' />
        ))}
      </div>
    ) : null} */}
    <div className='mt-[20px] grid grid-cols-4 gap-[20px]'>
      <img key={'image-1'} src={IMG} alt='' className='rounded-md' width={239} height={239} />
      <img key={'image-2'} src={IMG} alt='' className='rounded-md' width={239} height={239} />
    </div>
  </div>
);

ReviewCard.Header = ReviewCardHeader;
ReviewCard.Content = ReviewCardContent;

export { ReviewCard };
