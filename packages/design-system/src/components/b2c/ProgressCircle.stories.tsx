import { Meta, StoryObj } from '@storybook/react';
import { ProgressCircle, ProgressCircleProps } from './ProgressCircle';

const meta: Meta<ProgressCircleProps> = {
  title: 'Components/b2c/ProgressCircle',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  component: ProgressCircle,
};

export default meta;

type Story = StoryObj<ProgressCircleProps>;

export const Default: Story = {
  args: {
    variant: 'primary',
  },
};
