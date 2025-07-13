import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'components/b2b/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['small', 'large'] },
    checked: { control: 'boolean' },
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Small_Default: Story = {
  args: {
    size: 'small',
    checked: true,
    pressed: false,
    disabled: false,
  },
};

export const Small_Pressed: Story = {
  args: {
    size: 'small',
    checked: true,
    pressed: true,
    disabled: false,
  },
};

export const Small_Disabled: Story = {
  args: {
    size: 'small',
    checked: true,
    pressed: false,
    disabled: true,
  },
};

export const Large_Default: Story = {
  args: {
    size: 'large',
    checked: true,
    pressed: false,
    disabled: false,
  },
};

export const Large_Pressed: Story = {
  args: {
    size: 'large',
    checked: true,
    pressed: true,
    disabled: false,
  },
};

export const Large_Disabled: Story = {
  args: {
    size: 'large',
    checked: true,
    pressed: false,
    disabled: true,
  },
};
