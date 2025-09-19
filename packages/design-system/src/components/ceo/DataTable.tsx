'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  TableState,
  OnChangeFn,
  PaginationState,
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

interface DataTableOptions<TData> {
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  pageCount?: number;
  state?: Partial<TableState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyRenderer?: React.ReactNode;
  options?: DataTableOptions<TData>;
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  emptyRenderer,
  options,
}: DataTableProps<TData, TValue>) {
  const {
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount,
    state,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
  } = options || {};

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    defaultColumn: {
      size: 100,
      minSize: 50,
      maxSize: 539,
    },
    // 서버에서 데이터 불러올 때 필요한 설정
    manualPagination,
    manualSorting,
    manualFiltering,
    pageCount,

    // 상위 컴포넌트에서 제어하는 상태/핸들러
    state,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,

    // 클라이언트에서 직접 처리하는 전용 처리기 (manual*이 false일 때만 동작)
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !manualPagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: !manualSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: !manualFiltering ? getFilteredRowModel() : undefined,
  });

  return (
    <table className='w-full border-collapse'>
      <thead className='bg-[#F8F9FA]'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='p-[20px] text-gray-5 body-2'
                style={{ width: header.getSize() }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows?.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-[20px] py-[23px]'
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className='py-[200px] text-center text-gray-3 body-2'>
              {emptyRenderer ?? '목록이 비어있습니다.'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
