import type { Meta, StoryObj } from '@storybook/react';
import { SelectBox } from './SelectBox';

const meta = {
  title: 'Components/ceo/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof SelectBox>;

const sampleOptions = [
  { value: '1', label: '한식' },
  { value: '2', label: '중식' },
  { value: '3', label: '일식' },
];

const longOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `${i + 1}`,
  label: `옵션 ${i + 1}`,
}));

export const Default: Story = {
  render: () => {
    return <SelectBox options={sampleOptions} placeholder='카테고리 선택' />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <SelectBox options={sampleOptions} placeholder='카테고리 선택' disabled />;
  },
};

export const WithLabel: Story = {
  render: () => {
    return <SelectBox label='카테고리 선택' options={sampleOptions} placeholder='카테고리 선택' />;
  },
};

export const Invalid: Story = {
  render: () => {
    return <SelectBox aria-invalid options={sampleOptions} placeholder='카테고리 선택' />;
  },
};

export const LongOptions: Story = {
  render: () => {
    return <SelectBox label='카테고리 선택' options={longOptions} placeholder='카테고리 선택' />;
  },
};

export const Small: Story = {
  render: () => {
    return <SelectBox size='small' options={sampleOptions} placeholder='카테고리 선택' />;
  },
};
