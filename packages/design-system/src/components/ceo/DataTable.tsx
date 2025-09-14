'use client';

import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';

import { KebabButton } from '../../icons';
import { Switch } from '../b2c';

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
};

// Type 1: 사진/내용/공개여부/조회/좋아요/댓글/케밥
export const columnsType1: ColumnDef<any>[] = [
  {
    accessorKey: 'image',
    header: '사진',
    meta: { width: 72, align: 'left' },
    cell: ({ getValue }) => (
      <div className='w-12 h-12 rounded bg-gray-200 overflow-hidden'>
        <img src={getValue() as string} alt='' className='w-12 h-12 object-cover' />
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: '내용',
    meta: { isText: true, align: 'left' },
    cell: ({ getValue }) => <span className='block truncate'>{String(getValue() ?? '')}</span>,
  },
  {
    accessorKey: 'active',
    header: '공개여부',
    meta: { width: 96, align: 'center' },
    cell: ({ getValue }) => <Switch checked={!!getValue()} />,
  },
  {
    accessorKey: 'views',
    header: '조회',
    meta: { width: 100, align: 'right' },
    cell: ({ getValue }) => Number(getValue() ?? 0).toLocaleString(),
  },
  {
    accessorKey: 'likes',
    header: '좋아요',
    meta: { width: 100, align: 'right' },
    cell: ({ getValue }) => Number(getValue() ?? 0).toLocaleString(),
  },
  {
    accessorKey: 'comments',
    header: '댓글',
    meta: { width: 100, align: 'right' },
    cell: ({ getValue }) => Number(getValue() ?? 0).toLocaleString(),
  },
  {
    id: 'actions',
    header: '',
    meta: { width: 48, align: 'right' },
    cell: () => (
      <div className='pr-1 flex justify-end'>
        <KebabButton onClick={() => {}} />
      </div>
    ),
  },
];

// Type 3: 번호/포인트/채널/종류/적립시간
export const columnsType3: ColumnDef<any>[] = [
  { accessorKey: 'no', header: '번호', meta: { width: 80, align: 'right' } },
  {
    accessorKey: 'point',
    header: '포인트',
    meta: { width: 120, align: 'right' },
    cell: ({ getValue }) => Number(getValue() ?? 0).toLocaleString(),
  },
  { accessorKey: 'channel', header: '채널', meta: { isText: true, align: 'left' } },
  { accessorKey: 'type', header: '종류', meta: { isText: true, align: 'left' } },
  { accessorKey: 'earnedAt', header: '적립시간', meta: { width: 160, align: 'right' } },
];

// Type 5: 닉네임/받은 일시/사용 일시
export const columnsType5: ColumnDef<any>[] = [
  {
    accessorKey: 'nickname',
    header: '닉네임',
    meta: { isText: true }, // 이 칼럼이 자동으로 가장 넓게 차지함
  },
  {
    accessorKey: 'receivedAt',
    header: '받은 일시',
    meta: { align: 'right' }, // 최소폭만 확보됨
  },
  {
    accessorKey: 'usedAt',
    header: '사용 일시',
    meta: { align: 'right' },
  },
];

// 메시지: 내용/일시
export const columnsMessage: ColumnDef<any>[] = [
  { accessorKey: 'content', header: '내용', meta: { isText: true, align: 'left' } },
  { accessorKey: 'createdAt', header: '일시', meta: { width: 160, align: 'right' } },
];

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full border-collapse bg-white table-auto'>
        <thead className='bg-[#F8F9FA]'>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h, idx) => {
                const meta = h.column.columnDef.meta ?? {};
                const align = meta.align ?? (meta.isText ? 'left' : 'right');
                return (
                  <th
                    key={h.id}
                    className={`body-2 text-gray-5 py-[20px] ${
                      idx === 0 ? 'pl-[20px]' : 'px-[20px]'
                    } ${align === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, idx) => {
                const meta = cell.column.columnDef.meta ?? {};
                const align = meta.align ?? (meta.isText ? 'left' : 'right');
                return (
                  <td
                    key={cell.id}
                    className={`body-2 py-[23px] ${
                      idx === 0 ? 'pl-[20px]' : 'px-[20px]'
                    } ${align === 'right' ? 'text-right' : 'text-left'} ${
                      meta.isText ? 'truncate' : 'whitespace-nowrap'
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
