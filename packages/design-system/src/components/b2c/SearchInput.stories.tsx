import type { StoryObj } from '@storybook/react';

import { SearchInput } from './SearchInput';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/SearchInput',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <SearchInput placeholder='검색어를 입력해주세요.' />;
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    return <SearchInput placeholder='검색어를 입력해주세요.' defaultValue='기본값' />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <SearchInput
        placeholder='검색어를 입력해주세요.'
        value={searchValue}
        onChange={setSearchValue}
      />
    );
  },
};
