import type { Meta, StoryObj } from '@storybook/react';
import { CardForm } from './CardForm';
import { Card } from './Card';
import { CardSubtitle } from './CardSubtitle';
import { Input } from './Input';
import { TextArea } from './TextArea';
import { SelectBox } from './SelectBox';
import { Button } from './Button';

const meta = {
  title: 'Components/ceo/Page',
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
    <CardForm {...args} className='w-[800px]'>
      <div className='headline-2'>기본 정보</div>
      <Card>
        <CardSubtitle label='업체명' required>
          <Input id='name' />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='업종' required>
          <SelectBox
            options={[
              { value: '1', label: '족발 보쌈@@@@@@@@@@@@@@' },
              { value: '2', label: '고기' },
              { value: '3', label: '패스트푸드' },
              { value: '4', label: '피자' },
              { value: '5', label: '야식' },
              { value: '6', label: '치킨' },
              { value: '7', label: '카페' },
              { value: '8', label: '분식' },
              { value: '9', label: '아시안' },
            ]}
            label='업종 선택'
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='매장소개' required>
          <TextArea id='name' maxLength={1000} />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='매장번호' required>
          <Input id='name' />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='주소' required>
          <div>지도</div>
          <Input id='name' inputType='search' />
          <Input id='name' />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='찾아오시는길' required>
          <TextArea id='name' maxLength={1000} />
        </CardSubtitle>
      </Card>
      <div className='flex justify-center'>
        <Button>저장</Button>
      </div>
    </CardForm>
  ),
};
