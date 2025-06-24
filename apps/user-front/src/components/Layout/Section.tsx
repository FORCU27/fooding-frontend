import React from 'react';

import { ChevronRightIcon } from '@repo/design-system/icons';

import { cn } from '@/utils/cn';

type SectionProps = React.ComponentPropsWithRef<'section'>;

const Section = ({ className, children, ...props }: SectionProps) => {
  return (
    <section className={cn('px-grid-margin bg-white flex flex-col', className)} {...props}>
      {children}
    </section>
  );
};

type SectionHeaderProps = React.ComponentPropsWithRef<'div'>;

const SectionHeader = ({ className, children, ...props }: SectionHeaderProps) => {
  return (
    <div className={cn('mt-[20px] flex justify-between items-center', className)} {...props}>
      {children}
    </div>
  );
};

type SectionTitleProps = React.ComponentPropsWithRef<'h2'>;

const SectionTitle = ({ className, children, ...props }: SectionTitleProps) => {
  return (
    <h2 className={cn('headline-3', className)} {...props}>
      {children}
    </h2>
  );
};

type SectionLinkProps = React.ComponentPropsWithRef<'button'>;

const SectionLink = ({ className, children, ...props }: SectionLinkProps) => {
  return (
    <button className={cn('flex items-center h-fit body-5 text-gray-5', className)} {...props}>
      {children}
      <ChevronRightIcon className='size-[18px]' />
    </button>
  );
};

Section.Header = SectionHeader;
Section.Title = SectionTitle;
Section.Link = SectionLink;

export { Section };
