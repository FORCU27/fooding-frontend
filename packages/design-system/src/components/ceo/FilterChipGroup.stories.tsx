import type { StoryObj } from '@storybook/react';
import { FilterChipGroup } from './FilterChipGroup';
import { useState } from 'react';

const meta = {
  title: 'components/ceo/FilterChipGroup',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState('1');
    const [filterParam, setFilterParam] = useState<'ASCENDING' | 'DESCENDING'>('ASCENDING');

    return (
      <FilterChipGroup
        value={tab}
        onChange={setTab}
        filterParam={filterParam}
        onFilterChange={setFilterParam}
        className='w-[500px]'
      >
        <FilterChipGroup.List filterParam={filterParam} onFilterChange={setFilterParam}>
          <FilterChipGroup.Trigger value='1'>전체</FilterChipGroup.Trigger>
          <FilterChipGroup.Trigger value='2'>외부</FilterChipGroup.Trigger>
          <FilterChipGroup.Trigger value='3'>음식</FilterChipGroup.Trigger>
          <FilterChipGroup.Trigger value='4'>최신순</FilterChipGroup.Trigger>
        </FilterChipGroup.List>

        <FilterChipGroup.Content value='1'>전체 콘텐츠 ({filterParam})</FilterChipGroup.Content>
        <FilterChipGroup.Content value='2'>외부 콘텐츠 ({filterParam})</FilterChipGroup.Content>
        <FilterChipGroup.Content value='3'>음식 콘텐츠 ({filterParam})</FilterChipGroup.Content>
        <FilterChipGroup.Content value='4'>최신 콘텐츠 ({filterParam})</FilterChipGroup.Content>
      </FilterChipGroup>
    );
  },
};
