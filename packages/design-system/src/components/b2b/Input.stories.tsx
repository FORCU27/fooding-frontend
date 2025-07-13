import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'components/b2b/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'input',
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['off', 'on', 'error', 'correct'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Off: Story = {
  args: { status: 'off' },
};

export const On: Story = {
  args: { status: 'on', value: 'input' },
};

export const Error: Story = {
  args: { status: 'error', value: 'input' },
};

export const Correct: Story = {
  args: { status: 'correct', value: 'input' },
};
