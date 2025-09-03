import { useEffect, useState } from 'react';

import { createContext } from '@repo/design-system/utils';
import useEmblaCarousel, { EmblaViewportRefType } from 'embla-carousel-react';

import { cn } from '@/utils/cn';

type CarouselProps = {
  children: React.ReactNode;
  initialPage?: number;
};

const Carousel = ({ children, initialPage }: CarouselProps) => {
  const [carouselRef, carousel] = useEmblaCarousel({
    loop: true,
    startIndex: initialPage ? initialPage - 1 : undefined,
  });
  const [currentPage, setCurrentPage] = useState<number | null>(null);

  useEffect(() => {
    if (!carousel) return;

    setCurrentPage(carousel.selectedScrollSnap() + 1);

    carousel.on('select', () => {
      setCurrentPage(carousel.selectedScrollSnap() + 1);
    });
  }, [carousel]);

  return <CarouselContext value={{ currentPage, carouselRef }}>{children}</CarouselContext>;
};

type CarouselViewportProps = React.ComponentPropsWithRef<'div'>;

const CarouselRegion = ({ className, children, ...props }: CarouselViewportProps) => {
  const { carouselRef } = useCarouselContext();

  return (
    <div
      className={cn('relative', className)}
      role='region'
      aria-roledescription='carousel'
      {...props}
    >
      <div ref={carouselRef} className={cn('overflow-hidden')}>
        {children}
      </div>
    </div>
  );
};

type CarouselListProps = React.ComponentPropsWithRef<'div'>;

const CarouselList = ({ className, children, ...props }: CarouselListProps) => {
  return (
    <div className={cn('flex', className)} {...props}>
      {children}
    </div>
  );
};

type CarouselItemProps = React.ComponentPropsWithRef<'div'>;

const CarouselItem = ({ className, children, ...props }: CarouselItemProps) => {
  return (
    <div
      role='group'
      aria-roledescription='slide'
      className={cn('min-w-0 shrink-0 grow-0 basis-full relative', className)}
      {...props}
    >
      {children}
    </div>
  );
};

type CarouselPaginationProps = {
  children: (props: { page: number }) => React.ReactNode;
};

const CarouselPagination = ({ children }: CarouselPaginationProps) => {
  const { currentPage } = useCarouselContext();

  if (currentPage === null) return null;

  return <>{children({ page: currentPage })}</>;
};

type CarouselContextValue = {
  currentPage: number | null;
  carouselRef: EmblaViewportRefType;
};

const [CarouselContext, useCarouselContext] = createContext<CarouselContextValue>('Carousel');

Carousel.Region = CarouselRegion;
Carousel.List = CarouselList;
Carousel.Item = CarouselItem;
Carousel.Pagination = CarouselPagination;

export { Carousel };
