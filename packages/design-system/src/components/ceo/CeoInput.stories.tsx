import type { Meta, StoryObj } from '@storybook/react';
import { CeoInput } from './CeoInput';

const meta = {
  title: 'Components/ceo/CeoInput',
  component: CeoInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    inputType: {
      control: {
        type: 'select',
        options: ['search', 'url', undefined],
      },
    },
  },
} satisfies Meta<typeof CeoInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '기본 인풋',
  },
};

export const Search: Story = {
  args: {
    inputType: 'search',
    placeholder: '검색어를 입력하세요',
  },
};

export const URL: Story = {
  args: {
    inputType: 'url',
    placeholder: 'URL을 입력하세요',
  },
};
