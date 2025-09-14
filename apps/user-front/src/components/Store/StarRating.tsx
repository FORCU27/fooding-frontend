import { useEffect, useState } from 'react';

import { StarIcon } from '@repo/design-system/icons';

interface StarRatingProps {
  defaultValue?: number;
  score?: number;
  starSize?: number;
  onChange?: (value: number) => void;
}

export const StarRating = ({
  defaultValue = 0,
  score,
  starSize = 18,
  onChange,
}: StarRatingProps) => {
  if (score) defaultValue = score;
  const [selectedValue, setSelectedValue] = useState<number | null>(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const isEditable = score === undefined;
  const displayScore = selectedValue ?? 0;
  const totalStars = 5;

  const handleClick = (value: number) => {
    if (!isEditable) return;
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className='flex items-center gap-1'>
      {Array.from({ length: totalStars }).map((_, index) => {
        const leftValue = index + 0.5;
        const fullValue = index + 1;

        const isFull = displayScore >= fullValue;
        const isHalf = displayScore >= leftValue && displayScore < fullValue;

        return (
          <div
            key={index}
            className={`relative w-[${starSize}] h-[${starSize}] ${isEditable ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div
              className='absolute left-0 top-0 w-[50%] h-full z-10'
              onClick={() => handleClick(leftValue)}
            />
            <div
              className='absolute right-0 top-0 w-[50%] h-full z-10'
              onClick={() => handleClick(fullValue)}
            />

            {isFull ? (
              <StarIcon size={starSize} className='fill-fooding-yellow stroke-fooding-yellow' />
            ) : isHalf ? (
              <div style={{ position: 'relative', width: starSize, height: starSize }}>
                <StarIcon
                  size={starSize}
                  className='fill-gray-3 stroke-gray-3'
                  style={{ position: 'absolute' }}
                />
                <StarIcon
                  size={starSize}
                  className='fill-fooding-yellow stroke-fooding-yellow'
                  style={{ position: 'absolute', top: 0, left: 0, clipPath: 'inset(0 50% 0 0)' }}
                />
              </div>
            ) : (
              <StarIcon size={starSize} className='fill-gray-3 stroke-gray-3' />
            )}
          </div>
        );
      })}
    </div>
  );
};
