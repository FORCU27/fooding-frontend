import type { Meta, StoryObj } from '@storybook/react';
import { CardForm } from './CardForm';
import { CeoCard } from './CeoCard';
import { CeoCarnSubtitle } from './CeoCarnSubtitle';
import { CeoInput } from './CeoInput';
import { CeoTextArea } from './CeoTextArea';
import { CeoCheckBox } from './CeoCheckBox';
import { CeoSelectBox } from './CeoSelectBox';

const meta = {
  title: 'Components/ceo/CeoCard',
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
    <CardForm {...args} className='w-[800px] space-y-5'>
      <div className='headline-2'>기본 정보</div>
      <CeoCard>
        <CeoCarnSubtitle label='업체명' required>
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='매장소개' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='카테고리 선택'>
          <CeoSelectBox
            options={[
              { value: '1', label: '한식' },
              { value: '2', label: '중식' },
            ]}
          />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='옵션 선택'>
          <div className='flex gap-4'>
            <CeoCheckBox labelText='옵션 A' />
            <CeoCheckBox labelText='옵션 B' />
          </div>
        </CeoCarnSubtitle>
      </CeoCard>
    </CardForm>
  ),
};
