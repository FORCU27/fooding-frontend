import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';
import { useState } from 'react';

const meta = {
  title: 'Components/ceo/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: { control: 'number' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <TextArea />;
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    return <TextArea placeholder='내용을 입력해 주세요.' />;
  },
};

export const MinimumHeight: Story = {
  render: () => {
    return <TextArea className='min-h-[200px]' placeholder='내용을 입력해 주세요.' />;
  },
};

export const WithMaxLength: Story = {
  render: () => {
    return <TextArea placeholder='100자 이내로 입력해주세요.' maxLength={100} />;
  },
};

export const DefaultValue: Story = {
  render: () => {
    return <TextArea defaultValue='텍스트' placeholder='내용을 입력해 주세요.' />;
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='내용을 입력해 주세요.'
      />
    );
  },
};
