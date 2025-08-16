import type { Meta, StoryObj } from '@storybook/react';
import { BusinessHours } from './BusinessHours';

const meta = {
  title: 'Components/ceo/BusinessHours',
  component: BusinessHours,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '640px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof BusinessHours>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
