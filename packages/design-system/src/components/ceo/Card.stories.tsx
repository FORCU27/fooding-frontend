import type { Meta, StoryObj } from '@storybook/react';
import { CardForm } from './CardForm';
import { Card } from './Card';
import { CardSubtitle } from './CardSubtitle';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { Checkbox } from './Checkbox';
import { SelectBox } from './SelectBox';

const meta = {
  title: 'Components/ceo/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CardForm {...args} className='w-[800px] space-y-5'>
      <div className='headline-2'>기본 정보</div>
      <Card>
        <CardSubtitle label='업체명' required>
          <Input id='name' />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='매장소개' required>
          <TextArea id='name' maxLength={1000} />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='카테고리 선택'>
          <SelectBox
            options={[
              { value: '1', label: '한식' },
              { value: '2', label: '중식' },
            ]}
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='옵션 선택'>
          <div className='flex gap-4'>
            <Checkbox labelText='옵션 A' />
            <Checkbox labelText='옵션 B' />
          </div>
        </CardSubtitle>
      </Card>
    </CardForm>
  ),
};
