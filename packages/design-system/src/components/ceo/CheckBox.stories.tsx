import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckBox } from './CheckBox';

const meta = {
  title: 'Components/ceo/CeoCheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    labelText: { control: 'text' },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelText: '선택 항목',
  },
};

export const Checked: Story = {
  args: {
    labelText: '선택된 항목',
    defaultChecked: true,
  },
};

export const Controlled: Story = {
  args: {
    labelText: '제어되는 체크박스',
  },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <>
        <CheckBox
          labelText='제어되는 체크박스'
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p className='mt-2 text-sm'>체크 상태: {checked ? '선택됨' : '선택 안됨'}</p>
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    labelText: '비활성화된 항목',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    labelText: '비활성화되고 선택된 항목',
    disabled: true,
    defaultChecked: true,
  },
};
