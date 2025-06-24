import Image from 'next/image';

import { FoodingIcon } from '@repo/design-system/icons';

type MenuCardProps = {
  children: React.ReactNode;
};

const MenuCard = ({ children }: MenuCardProps) => {
  return <div className='flex flex-col'>{children}</div>;
};

type MenuCardTitleProps = {
  children: React.ReactNode;
};

type MenuCardImageProps = {
  src: string | null;
  alt: string;
};

const MenuCardImage = ({ src, alt }: MenuCardImageProps) => {
  return (
    <div className='relative size-[140px] rounded-[12px] overflow-hidden'>
      {src && <Image fill src={src} alt={alt} className='w-full h-full object-cover' />}
      {src === null && (
        <div className='w-full h-full flex justify-center items-center bg-gray-1'>
          <FoodingIcon width={58} height={72} color='rgba(17, 17, 17, 0.1)' />
        </div>
      )}
    </div>
  );
};

const MenuCardTitle = ({ children }: MenuCardTitleProps) => {
  return <span className='mt-[12px] text-[12px] font-medium text-black'>{children}</span>;
};

const MenuCardPrice = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className='mt-[6px] text-[16px] leading-none font-bold text-[#EF4323]'>{children}</span>
  );
};

MenuCard.Image = MenuCardImage;
MenuCard.Title = MenuCardTitle;
MenuCard.Price = MenuCardPrice;

export { MenuCard };
