import { ChipButton } from './ChipButton';
import { cn } from '../../utils';

type ChipFilterProps = React.ComponentPropsWithRef<typeof ChipButton> & {
  active?: boolean;
};

const ChipFilter = ({ children, active = false, ...props }: ChipFilterProps) => {
  return (
    <ChipButton
      variant={active ? 'contained' : 'outlined'}
      suffix={<ChipButton.ChevronDownIcon />}
      aria-pressed={active}
      {...props}
    >
      {children}
    </ChipButton>
  );
};

type ChipFilterListProps = React.ComponentPropsWithoutRef<'div'> & {
  scrollable?: boolean;
  wrap?: boolean;
};

const ChipFilterList = ({
  className,
  children,
  scrollable = false,
  wrap = false,
  ...props
}: ChipFilterListProps) => {
  return (
    <div className={cn(scrollable && '-mx-grid-margin')}>
      <div
        className={cn(
          'flex gap-2',
          scrollable && 'overflow-x-auto w-full scrollbar-hide px-grid-margin',
          wrap && 'flex-wrap',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

ChipFilter.List = ChipFilterList;

export { ChipFilter };
