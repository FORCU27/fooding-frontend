import { StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/TextField',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  render: () => {
    return (
      <TextField label={<TextField.Label>이름</TextField.Label>}>
        <TextField.Input />
      </TextField>
    );
  },
};

export const Textarea: Story = {
  render: () => {
    return (
      <TextField label={<TextField.Label>자신을 소개해주세요.</TextField.Label>}>
        <TextField.Textarea placeholder='사람들에게 나를 간단하게 소개해보세요!' />
      </TextField>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    return (
      <TextField label={<TextField.Label>휴대폰 번호</TextField.Label>}>
        <TextField.Input placeholder='휴대폰 번호를 입력해주세요' />
      </TextField>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    return (
      <TextField
        label={<TextField.Label>이메일</TextField.Label>}
        description={<TextField.Description>이메일 주소를 입력하세요.</TextField.Description>}
      >
        <TextField.Input />
      </TextField>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <TextField label={<TextField.Label>이메일</TextField.Label>}>
        <TextField.Input placeholder='이메일을 입력하세요' disabled />
      </TextField>
    );
  },
};

export const Invalid: Story = {
  render: () => {
    return (
      <TextField
        label={<TextField.Label>이메일</TextField.Label>}
        error
        errorMessage={
          <TextField.ErrorMessage>올바른 이메일 주소를 입력해주세요.</TextField.ErrorMessage>
        }
      >
        <TextField.Input placeholder='이메일을 입력하세요' />
      </TextField>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <TextField
        value={value}
        onChange={setValue}
        label={<TextField.Label>이메일</TextField.Label>}
        description={<TextField.Description>이메일 주소를 입력하세요.</TextField.Description>}
      >
        <TextField.Input />
      </TextField>
    );
  },
};
