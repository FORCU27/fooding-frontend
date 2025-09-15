import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta = {
  title: 'Components/ceo/Pagination',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    return <Pagination page={page} total={5} onChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    return <Pagination page={page} total={20} onChange={setPage} />;
  },
};
