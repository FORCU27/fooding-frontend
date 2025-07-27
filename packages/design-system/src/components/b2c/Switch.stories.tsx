import type { StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/Switch',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Switch />;
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    return <Switch defaultChecked />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return <Switch checked={checked} onChange={setChecked} />;
  },
};
