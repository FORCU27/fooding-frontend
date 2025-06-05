import type { StoryObj } from '@storybook/react';

import { Input } from './Input';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/Input',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Input />;
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    return <Input placeholder='텍스트를 입력해주세요.' />;
  },
};

export const Dislabed: Story = {
  render: () => {
    return <Input placeholder='텍스트를 입력해주세요.' disabled />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Input
        placeholder='텍스트를 입력해주세요.'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
