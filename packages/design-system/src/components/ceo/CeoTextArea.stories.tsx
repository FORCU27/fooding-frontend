import type { Meta, StoryObj } from '@storybook/react';
import { CeoTextArea } from './CeoTextArea';

const meta = {
  title: 'Components/ceo/CeoTextArea',
  component: CeoTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: { control: 'number' },
  },
} satisfies Meta<typeof CeoTextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력해주세요.',
  },
};

export const WithMaxLength: Story = {
  args: {
    placeholder: '100자 이내로 입력해주세요.',
    maxLength: 100,
  },
};
