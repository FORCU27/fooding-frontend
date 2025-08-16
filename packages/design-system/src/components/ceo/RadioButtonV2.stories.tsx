import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioButton, RadioGroup } from './RadioButtonV2';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/ceo/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '라디오 버튼 선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    children: {
      control: 'text',
      description: '라디오 버튼 레이블',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'radio-1',
    name: 'example',
    value: 'option1',
    checked: false,
    onChange: () => {},
    children: '제한 있어요',
  },
};

export const Checked: Story = {
  args: {
    id: 'radio-2',
    name: 'example',
    value: 'option2',
    checked: true,
    onChange: () => {},
    children: '제한 없어요',
  },
};

export const Disabled: Story = {
  args: {
    id: 'radio-3',
    name: 'example',
    value: 'option3',
    checked: false,
    disabled: true,
    onChange: () => {},
    children: '비활성화됨',
  },
};

// RadioGroup을 사용한 예시
export const GroupExample = () => {
  const [selectedValue, setSelectedValue] = useState('yes');

  return (
    <div className='p-4'>
      <h3 className='text-lg font-medium mb-4'>제한 여부를 선택해주세요</h3>
      <RadioGroup
        name='limitation'
        value={selectedValue}
        onChange={setSelectedValue}
        direction='horizontal'
      >
        <RadioButton id='limit-yes' value='yes'>
          제한 있어요
        </RadioButton>
        <RadioButton id='limit-no' value='no'>
          제한 없어요
        </RadioButton>
      </RadioGroup>
      <p className='mt-4 text-sm text-gray-600'>선택된 값: {selectedValue}</p>
    </div>
  );
};

export const VerticalGroup = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <div className='p-4'>
      <h3 className='text-lg font-medium mb-4'>결제 방식을 선택해주세요</h3>
      <RadioGroup
        name='payment'
        value={selectedValue}
        onChange={setSelectedValue}
        direction='vertical'
      >
        <RadioButton id='payment-1' value='option1'>
          카드 결제
        </RadioButton>
        <RadioButton id='payment-2' value='option2'>
          계좌 이체
        </RadioButton>
        <RadioButton id='payment-3' value='option3'>
          간편 결제
        </RadioButton>
      </RadioGroup>
      <p className='mt-4 text-sm text-gray-600'>선택된 값: {selectedValue}</p>
    </div>
  );
};
