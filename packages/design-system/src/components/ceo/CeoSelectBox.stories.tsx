import type { Meta, StoryObj } from '@storybook/react';
import { CeoSelectBox } from './CeoSelectBox';

const meta: any = {
  title: 'Components/ceo/CeoSelectBox',
  component: CeoSelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CeoSelectBox>;

const sampleOptions = [
  { value: '1', label: '한식' },
  { value: '2', label: '중식' },
  { value: '3', label: '일식' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: '업종을 선택해주세요',
  },
};
