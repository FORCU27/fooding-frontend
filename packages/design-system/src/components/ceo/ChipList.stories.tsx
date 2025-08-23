import type { Meta, StoryObj } from '@storybook/react';
import { ChipList } from './ChipList';
import { useState } from 'react';

const meta: Meta<typeof ChipList> = {
  title: 'Components/ceo/ChipList',
  component: ChipList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChipList>;

export const Default: Story = {
  render: () => {
    const optionList = [
      { name: '옵션1', value: 'option1' },
      { name: '옵션2', value: 'option2' },
      { name: '옵션3', value: 'option3' },
      { name: '옵션4', value: 'option4' },
    ];

    // multiple은 string[]
    const [multiSelected, setMultiSelected] = useState<string[]>(
      optionList.map((opt) => opt.value),
    );
    // single은 string
    const [singleSelected, setSingleSelected] = useState<string>('option2');

    return (
      <div className='flex flex-col gap-6 w-full max-w-sm'>
        <ChipList
          type='multiple'
          value={multiSelected}
          options={optionList}
          onValueChange={(val) => setMultiSelected(val)}
        />

        <ChipList
          type='single'
          value={singleSelected}
          options={optionList}
          onValueChange={(val) => setSingleSelected(val)}
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

    const [selected, setSelected] = useState<string[]>(optionList.map((opt) => opt.value));

    return (
      <ChipList
        type='multiple'
        value={selected}
        onValueChange={(val) => setSelected(val)}
        options={optionList}
        hasCloseBtn
      />
    );
  },
};

export const MultipleHasNotButton: Story = {
  render: () => {
    const optionList = [
      { name: '옵션1', value: 'option1' },
      { name: '옵션2', value: 'option2' },
      { name: '옵션3', value: 'option3' },
      { name: '옵션4', value: 'option4' },
      { name: '옵션5', value: 'option5' },
      { name: '옵션6', value: 'option6' },
    ];

    const [selected, setSelected] = useState<string[]>(optionList.map((opt) => opt.value));

    return (
      <ChipList
        type='multiple'
        value={selected}
        onValueChange={(val) => setSelected(val)}
        options={optionList}
        hasCloseBtn={false}
      />
    );
  },
};

export const Single: Story = {
  render: () => {
    const optionList = [
      { name: '옵션1', value: 'option1' },
      { name: '옵션2', value: 'option2' },
    ];

    const [selected, setSelected] = useState<string>('option1');

    return (
      <ChipList
        type='single'
        options={optionList}
        value={selected}
        onValueChange={(val) => setSelected(val)}
      />
    );
  },
};

export const SingleHasNotButton: Story = {
  render: () => {
    const optionList = [
      { name: '옵션1', value: 'option1' },
      { name: '옵션2', value: 'option2' },
    ];

    const [selected, setSelected] = useState<string>('option1');

    return (
      <ChipList
        type='single'
        options={optionList}
        value={selected}
        onValueChange={(val) => setSelected(val)}
        hasCloseBtn={false}
      />
    );
  },
};
