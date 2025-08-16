import type { Meta, StoryObj } from '@storybook/react';
import { ChipSelector } from './ChipSelector';
import { useState } from 'react';

const meta: Meta<typeof ChipSelector> = {
  title: 'Components/ceo/ToggleGroup/ChipSelector',
  component: ChipSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChipSelector>;

export const Default: Story = {
  render: () => {
    const optionList = [
      { name: '옵션1', value: 'option1' },
      { name: '옵션2', value: 'option2' },
      { name: '옵션3', value: 'option3' },
    ];

    return (
      <div className='flex flex-col gap-3 w-full'>
        {/* multiple uncontrolled */}
        <ChipSelector
          type='multiple'
          value={['option2']}
          options={optionList}
          onValueChange={() => {}}
          hasCloseBtn
        />

        {/* single uncontrolled */}
        <ChipSelector
          type='single'
          value='option1'
          options={optionList}
          onValueChange={() => {}}
          hasCloseBtn
        />
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const optionList = [
      { name: '옵션1', value: 'option1' },
      { name: '옵션2', value: 'option2' },
      { name: '옵션3', value: 'option3' },
      { name: '옵션4', value: 'option4' },
      { name: '옵션5', value: 'option5' },
      { name: '옵션6', value: 'option6' },
    ];

    const [selected, setSelected] = useState<string[]>(['option1']);

    return (
      <ChipSelector
        type='multiple'
        value={selected}
        onValueChange={(val) => {
          if (Array.isArray(val)) {
            setSelected(val);
          }
        }}
        options={optionList}
        hasCloseBtn
      />
    );
  },
};

export const Single: Story = {
  render: () => {
    const optionList = [{ name: '옵션1', value: 'option1' }];
    const [selected, setSelected] = useState<string>('option1');

    return (
      <div className='flex flex-col gap-3 w-full'>
        <ChipSelector
          type='single'
          options={optionList}
          value={selected}
          onValueChange={(val) => {
            if (typeof val === 'string') {
              setSelected(val);
            }
          }}
          hasCloseBtn
        />
        <ChipSelector
          type='single'
          options={optionList}
          value={selected}
          onValueChange={(val) => {
            if (typeof val === 'string') {
              setSelected(val);
            }
          }}
          hasCloseBtn={false}
        />
      </div>
    );
  },
};
