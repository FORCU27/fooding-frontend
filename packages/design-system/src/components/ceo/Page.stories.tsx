import type { Meta, StoryObj } from '@storybook/react';
import { CardForm } from './CardForm';
import { CeoCard } from './CeoCard';
import { CeoCarnSubtitle } from './CeoCarnSubtitle';
import { CeoInput } from './CeoInput';
import { CeoTextArea } from './CeoTextArea';

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
        <CeoCarnSubtitle label='업체명' required>
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='업체명' required>
          <CeoInput id='name' inputType='search' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='매장소개' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='매장번호' required>
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='주소' required>
          <div>지도</div>
          <CeoInput id='name' inputType='search' />
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='찾아오시는길' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCarnSubtitle>
      </CeoCard>
    </CardForm>
  ),
};
