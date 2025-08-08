import { useState } from 'react';
import RadioButtonGroup from './RadioButtonGroup';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/ceo/RadioButtonGroup',
  component: RadioButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    options: { control: 'object' },
    selectedValue: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const optionList = [
  { label: '옵션1', value: 'option1' },
  { label: '옵션2', value: 'option2' },
  { label: '옵션3', value: 'option3' },
];

export const Default: Story = {
  args: {
    name: 'example',
    options: optionList,
    selectedValue: 'option1',
    onChange: (value: string) => console.log('changed to', value),
  },
  render: (args) => {
    const [value, setValue] = useState(args.selectedValue);
    return (
      <>
        <p>선택값 : {value}</p>
        <RadioButtonGroup
          {...args}
          selectedValue={value}
          onChange={(newValue) => {
            setValue(newValue);
            args.onChange?.(newValue);
          }}
        />
      </>
    );
  },
};

export const Controlled: Story = {
  args: {
    name: 'example',
    options: optionList,
    selectedValue: 'option1',
    onChange: (value: string) => console.log('changed to', value),
  },
  render: () => {
    const [value, setValue] = useState(optionList[0]?.value);
    return (
      <RadioButtonGroup
        options={optionList}
        name='그룹'
        selectedValue={value || '옵션1'}
        onChange={setValue}
      />
    );
  },
};
