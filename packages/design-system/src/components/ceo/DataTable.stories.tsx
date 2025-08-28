import { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

import { Switch } from '../b2c'; // 임시 사용

type Row = { id: number; title: string; price: number; active: boolean };

const meta: Meta<typeof DataTable<Row>> = {
  title: 'Components/ceo/DataTable',
  component: DataTable<Row>,
};

export default meta;
type Story = StoryObj<typeof DataTable<Row>>;

const data: Row[] = [
  { id: 1, title: '가상비전진 비대칭경 정육식단', price: 9999, active: true },
  { id: 2, title: '쿠폰 발급 내역', price: 8888, active: false },
];

export const Default: Story = {
  args: {
    columns: [
      { accessorKey: 'title', header: '내용' },
      { accessorKey: 'price', header: '금액' },
      {
        accessorKey: 'active',
        header: '공개여부',
        cell: ({ getValue }) => <Switch checked={getValue() as boolean} />,
      },
    ],
    data,
  },
};
