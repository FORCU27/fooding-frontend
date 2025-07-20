import type { Meta, StoryObj } from '@storybook/react';
import { CeoTimePicker } from './CeoTimePicker';

const meta = {
  title: 'Components/ceo/CeoTimePicker',
  component: CeoTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CeoTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '10:30',
  },
};
