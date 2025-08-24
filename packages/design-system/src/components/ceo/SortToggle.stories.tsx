import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SortOrder, SortToggle } from './SortToggle';

const meta = {
  title: 'Components/ceo/SortToggle',
  component: SortToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SortToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'LATEST' as SortOrder,
    keepSelectedOpen: false,
    onSortChange: () => {},
  },
};

export const SelectedOpen: Story = {
  args: {
    value: 'LATEST' as SortOrder,
    keepSelectedOpen: true,
    onSortChange: () => {},
  },
};

export const Controlled: Story = {
  args: { value: 'LATEST' as SortOrder, onSortChange: () => {} },
  render: (args) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('LATEST');

    return (
      <div className='flex flex-col'>
        <p>선택한 값:{sortOrder} </p>
        <SortToggle {...args} value={sortOrder} onSortChange={setSortOrder} />
      </div>
    );
  },
};

export const ControlledSelectedOpen: Story = {
  args: { value: 'LATEST' as SortOrder, onSortChange: () => {} },
  render: (args) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('LATEST');

    return (
      <div className='flex flex-col'>
        <p>선택한 값:{sortOrder} </p>
        <SortToggle
          {...args}
          value={sortOrder}
          onSortChange={setSortOrder}
          keepSelectedOpen={true}
        />
      </div>
    );
  },
};
