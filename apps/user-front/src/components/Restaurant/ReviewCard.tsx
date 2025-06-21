import { FoodingIcon, StarIcon } from '@repo/design-system/icons';

type ReviewCardProps = {
  review: {
    nickname: string;
    imageUrl: string;
    content: string;
    score: number;
    createdAt: string;
  };
};

const mock = {
  author: {
    reviewCount: 10,
    followerCount: 207,
  },
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className='w-[350px] flex flex-col rounded-[12px] shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.05)] bg-white'>
      <div className='bg-gray-1 flex justify-center items-center h-[200px] rounded-t-[12px]'>
        <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
      </div>
      <div className='flex flex-col pt-5 px-6 pb-10'>
        <div className='flex'>
          <div className='size-[56px] bg-gray-1 rounded-full' />
          <div className='ml-3  flex flex-col justify-center flex-1'>
            <span className='subtitle-3 text-black'>{review.nickname}</span>
            <span className='flex items-center mt-1 body-7 text-gray-5'>
              리뷰 {mock.author.reviewCount}
              <span className='inline-flex mx-[5px] size-[2px] rounded-full bg-gray-5' />
              팔로워 {mock.author.followerCount}
            </span>
          </div>
          <div className='flex flex-col justify-center items-end'>
            <div className='flex items-center gap-1'>
              <StarIcon className='size-[18px] stroke-fooding-yellow fill-fooding-yellow' />
              <span className='subtitle-6 text-fooding-yellow'>{review.score}</span>
            </div>
            {/* TODO: 날짜 포맷팅 (ISO 8601 -> 1개월전) */}
            <span className='mt-[10px] body-7 text-gray-5'>{review.createdAt}</span>
          </div>
        </div>
        <p className='mt-4 body-3 text-black line-clamp-3'>{review.content}</p>
      </div>
    </div>
  );
};
