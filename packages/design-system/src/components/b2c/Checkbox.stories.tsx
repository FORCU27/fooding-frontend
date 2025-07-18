import type { StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/Checkbox',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <Checkbox />;
  },
};

export const Checked: Story = {
  render: () => {
    return <Checkbox defaultChecked />;
  },
};

export const Disabled: Story = {
  render: () => {
    return <Checkbox disabled />;
  },
};

export const WithLabel: Story = {
  render: () => {
    return (
      <Checkbox.Label>
        <Checkbox />
        <Checkbox.LabelText>
          쿠폰 구매 시 취소가 불가능하오니 확인 후 사용해주세요!
        </Checkbox.LabelText>
      </Checkbox.Label>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return <Checkbox checked={checked} onChange={setChecked} />;
  },
};
