import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import { cn, createContext } from '../../utils';

type PaginationProps = Omit<React.ComponentPropsWithRef<'nav'>, 'onChange'> & {
  page: number;
  onChange: (page: number) => void;
  total: number;
};

interface PaginationItem extends React.ComponentPropsWithoutRef<'button'> {
  page: number;
}

const PaginationItem = ({ page, ...props }: PaginationItem) => {
  const { page: currentPage, onChange } = usePaginationContext();

  const isActive = page === currentPage;

  const onClick = () => {
    onChange(page);
  };

  return (
    <button
      className={cn(
        'bg-white hover:bg-gray-1 flex size-[38px] rounded-[5px] items-center justify-center text-sm cursor-pointer',
        isActive && 'bg-gray-6 text-white hover:bg-gray-6',
      )}
      aria-label='페이지 이동'
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
      {...props}
    >
      {page}
    </button>
  );
};

const Pagination = ({ className, page, onChange, total, ...props }: PaginationProps) => {
  const currentPage = page;

  const renderPages = () => {
    if (total <= 10) {
      return Array(total)
        .fill(0)
        .map((_, index) => <PaginationItem key={index} page={index + 1} />);
    }

    if (page <= 5) {
      return (
        <>
          <PaginationItem page={1} />
          <PaginationItem page={2} />
          <PaginationItem page={3} />
          <PaginationItem page={4} />
          <PaginationItem page={5} />
          <PaginationItem page={6} />
          <PaginationEllipsis />
          <PaginationItem page={total - 1} />
          <PaginationItem page={total} />
        </>
      );
    }

    if (page >= 6 && page <= total - 5) {
      return (
        <>
          <PaginationItem page={1} />
          <PaginationItem page={2} />
          <PaginationEllipsis />
          <PaginationItem page={currentPage - 1} />
          <PaginationItem page={currentPage} />
          <PaginationItem page={currentPage + 1} />
          <PaginationEllipsis />

          <PaginationItem page={total - 1} />
          <PaginationItem page={total} />
        </>
      );
    }

    return (
      <>
        <PaginationItem page={1} />
        <PaginationItem page={2} />
        <PaginationEllipsis />
        <PaginationItem page={total - 5} />
        <PaginationItem page={total - 4} />
        <PaginationItem page={total - 3} />
        <PaginationItem page={total - 2} />
        <PaginationItem page={total - 1} />
        <PaginationItem page={total} />
      </>
    );
  };

  const value = {
    page,
    onChange,
  };

  if (total === 0) return null;

  return (
    <PaginationContext.Provider value={value}>
      <nav className={cn('text-sub flex items-center gap-10', className)} {...props}>
        <Navigation
          aria-label='이전 페이지로 이동'
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeftIcon className='size-5' />
        </Navigation>
        <div className='bg-background flex items-center gap-1 p-1'>{renderPages()}</div>
        <Navigation
          aria-label='다음 페이지로 이동'
          onClick={() => onChange(page + 1)}
          disabled={page === total}
        >
          <ChevronRightIcon className='size-5' />
        </Navigation>
      </nav>
    </PaginationContext.Provider>
  );
};

type NavigationProps = React.ComponentPropsWithoutRef<'button'>;

const Navigation = ({ className, children, ...props }: NavigationProps) => {
  return (
    <button
      className={cn(
        'flex size-[38px] items-center justify-center rounded-sm transition-colors',
        'disabled:pointer-events-none disabled:text-gray-8',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const PaginationEllipsis = () => {
  return (
    <p className='flex size-[38px] rounded-[5px] items-center justify-center'>
      <EllipsisIcon />
    </p>
  );
};

const EllipsisIcon = () => {
  return (
    <svg
      className='mt-2'
      width='10'
      height='3'
      viewBox='0 0 10 3'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.78906 2.08203C1.31055 2.08203 0.900391 1.68555 0.914062 1.19336C0.900391 0.714844 1.31055 0.318359 1.78906 0.318359C2.26758 0.318359 2.66406 0.714844 2.66406 1.19336C2.66406 1.68555 2.26758 2.08203 1.78906 2.08203ZM5.34375 2.08203C4.86523 2.08203 4.45508 1.68555 4.46875 1.19336C4.45508 0.714844 4.86523 0.318359 5.34375 0.318359C5.82227 0.318359 6.21875 0.714844 6.21875 1.19336C6.21875 1.68555 5.82227 2.08203 5.34375 2.08203ZM8.89844 2.08203C8.41992 2.08203 8.00977 1.68555 8.02344 1.19336C8.00977 0.714844 8.41992 0.318359 8.89844 0.318359C9.37695 0.318359 9.77344 0.714844 9.77344 1.19336C9.77344 1.68555 9.37695 2.08203 8.89844 2.08203Z'
        fill='#111111'
      />
    </svg>
  );
};

type PaginationContextValue = {
  page: number;
  onChange: (page: number) => void;
};

const [PaginationContext, usePaginationContext] =
  createContext<PaginationContextValue>('Pagination');

export { Pagination };
