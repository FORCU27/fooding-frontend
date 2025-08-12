import { useState } from 'react';
import { RadioButton } from './RadioButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ceo/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '옵션 1',
    value: 'option1',
    name: 'example',
    checked: false,
    onChange: (value: string) => console.log('changed to', value),
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value);
    return (
      <RadioButton
        {...args}
        checked={selectedValue === args.value}
        onChange={(value) => {
          setSelectedValue(value);
          args.onChange?.(value);
        }}
      />
    );
  },
};
