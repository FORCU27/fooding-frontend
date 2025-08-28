'use client';

import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
};

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className='w-full border-collapse'>
      <thead className='bg-[#F8F9FA]'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='pl-[20px] py-[20px] min-w-[96px] text-left body-2 text-gray-5'
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
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className=''>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='pl-[20px] py-[23px] body-2'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
