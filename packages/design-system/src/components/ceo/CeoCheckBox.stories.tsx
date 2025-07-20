import type { Meta, StoryObj } from '@storybook/react';
import { CeoCheckBox } from './CeoCheckBox';

const meta = {
  title: 'Components/ceo/CeoCheckBox',
  component: CeoCheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    labelText: { control: 'text' },
  },
} satisfies Meta<typeof CeoCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: '선택 항목',
  },
};

export const Checked: Story = {
  args: {
    labelText: '선택된 항목',
    defaultChecked: true,
  },
};
