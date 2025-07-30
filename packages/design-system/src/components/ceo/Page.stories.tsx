import type { Meta, StoryObj } from '@storybook/react';
import { CardForm } from './CardForm';
import { CeoCard } from './CeoCard';
import { CeoCardSubtitle } from './CeoCardSubtitle';
import { CeoInput } from './CeoInput';
import { CeoTextArea } from './CeoTextArea';
import { CeoSelectBox } from './CeoSelectBox';
import { CeoButton } from './CeoButton';

const meta = {
  title: 'Components/ceo/Page',
  component: CeoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof CeoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <CardForm {...args} className='w-[800px]'>
      <div className='headline-2'>기본 정보</div>
      <CeoCard>
        <CeoCardSubtitle label='업체명' required>
          <CeoInput id='name' />
        </CeoCardSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCardSubtitle label='업종' required>
          <CeoSelectBox
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
        </CeoCardSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCardSubtitle label='매장소개' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCardSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCardSubtitle label='매장번호' required>
          <CeoInput id='name' />
        </CeoCardSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCardSubtitle label='주소' required>
          <div>지도</div>
          <CeoInput id='name' inputType='search' />
          <CeoInput id='name' />
        </CeoCardSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCardSubtitle label='찾아오시는길' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCardSubtitle>
      </CeoCard>
      <div className='flex justify-center'>
        <CeoButton>저장</CeoButton>
      </div>
    </CardForm>
  ),
};
