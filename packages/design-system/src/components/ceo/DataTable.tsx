'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyRenderer?: React.ReactNode;
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  emptyRenderer,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      size: 100,
      minSize: 50,
      maxSize: 539,
    },
  });

  return (
      <table className='w-full border-collapse'>
        <thead className='bg-[#F8F9FA]'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='p-[20px] text-gray-5 body-2' style={{ width: header.getSize() }}>
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
                  <td key={cell.id} className='px-[20px] py-[23px]' style={{ width: cell.column.getSize() }}>
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
