import type { StoryObj } from '@storybook/react';

import { SearchInput } from './SearchInput';

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
    return (
      <SearchInput.Container>
        <SearchInput placeholder='검색어를 입력해주세요' />
        <SearchInput.Button />
      </SearchInput.Container>
    );
  },
};
