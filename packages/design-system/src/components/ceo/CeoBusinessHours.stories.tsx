import type { Meta, StoryObj } from '@storybook/react';
import { CeoBusinessHours } from './CeoBusinessHours';

const meta = {
  title: 'Components/ceo/CeoBusinessHours',
  component: CeoBusinessHours,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CeoBusinessHours>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
