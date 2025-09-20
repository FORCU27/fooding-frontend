import { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'Components/ceo/Checkbox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Checkbox labelText='레이블' />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <Checkbox labelText='레이블' disabled />;
  },
};

export const Invalid: Story = {
  render: () => {
    return <Checkbox aria-invalid labelText='레이블' />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        labelText='레이블'
      />
    );
  },
};
