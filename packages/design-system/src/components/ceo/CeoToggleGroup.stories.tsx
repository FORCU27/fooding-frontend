import type { Meta, StoryObj } from '@storybook/react';
import { CeoToggleGroup, CeoToggleGroupItem } from './CeoToggleGroup';

const meta: any = {
  title: 'Components/ceo/CeoToggleGroup',
  component: CeoToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CeoToggleGroup>;

export const Default: Story = {
  render: (args: any) => (
    <CeoToggleGroup {...args} type='single' defaultValue='possible' className='w-[400px]'>
      <CeoToggleGroupItem value='possible' className='flex-1'>
        가능해요
      </CeoToggleGroupItem>
      <CeoToggleGroupItem value='impossible' className='flex-1'>
        불가능해요
      </CeoToggleGroupItem>
    </CeoToggleGroup>
  ),
};

export const Chip: Story = {
  render: (args: any) => (
    <CeoToggleGroup {...args} type='multiple' variant='chip' className='w-[600px]'>
      <CeoToggleGroupItem value='group'>단체이용 가능</CeoToggleGroupItem>
      <CeoToggleGroupItem value='takeout'>포장</CeoToggleGroupItem>
      <CeoToggleGroupItem value='delivery'>배달</CeoToggleGroupItem>
      <CeoToggleGroupItem value='reception'>방문접수/출장</CeoToggleGroupItem>
      <CeoToggleGroupItem value='reservation'>예약</CeoToggleGroupItem>
      <CeoToggleGroupItem value='wifi'>무선인터넷</CeoToggleGroupItem>
      <CeoToggleGroupItem value='kids'>유아시설/놀이방</CeoToggleGroupItem>
      <CeoToggleGroupItem value='toilet'>남/녀 화장실 구분</CeoToggleGroupItem>
      <CeoToggleGroupItem value='chair'>유아의자</CeoToggleGroupItem>
      <CeoToggleGroupItem value='waiting'>대기공간</CeoToggleGroupItem>
      <CeoToggleGroupItem value='no-kids'>노키즈존</CeoToggleGroupItem>
    </CeoToggleGroup>
  ),
};
