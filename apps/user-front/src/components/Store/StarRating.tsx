import { StarIcon } from '@repo/design-system/icons';

interface StarRatingProps {
  score: number;
  starSize?: number;
}

export const StarRating = ({ score, starSize = 18 }: StarRatingProps) => {
  const totalStars = 5;

  return (
    <div className='flex justify-center items-center gap-[2px]'>
      {Array.from({ length: totalStars }).map((_, idx) => {
        const current = idx + 1;

        if (score >= current) {
          return (
            <StarIcon
              key={idx}
              size={starSize}
              className='fill-fooding-yellow stroke-fooding-yellow'
            />
          );
        } else if (score >= current - 0.5) {
          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                width: `${starSize}px`,
                height: `${starSize}px`,
              }}
            >
              <StarIcon
                size={starSize}
                className='fill-gray-3 stroke-gray-3'
                style={{ position: 'absolute' }}
              />
              <StarIcon
                size={starSize}
                className='fill-fooding-yellow stroke-fooding-yellow'
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  clipPath: 'inset(0 50% 0 0)',
                }}
              />
            </div>
          );
        } else {
          return <StarIcon key={idx} size={starSize} className='fill-gray-3 stroke-gray-3' />;
        }
      })}
    </div>
  );
};
