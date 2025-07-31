import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta: any = {
  title: 'Components/ceo/CeoToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: (args: any) => (
    <ToggleGroup {...args} type='single' defaultValue='possible' className='w-[400px]'>
      <ToggleGroupItem value='possible' className='flex-1'>
        가능해요
      </ToggleGroupItem>
      <ToggleGroupItem value='impossible' className='flex-1'>
        불가능해요
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Chip: Story = {
  render: (args: any) => (
    <ToggleGroup {...args} type='multiple' variant='chip' className='w-[600px]'>
      <ToggleGroupItem value='group'>단체이용 가능</ToggleGroupItem>
      <ToggleGroupItem value='takeout'>포장</ToggleGroupItem>
      <ToggleGroupItem value='delivery'>배달</ToggleGroupItem>
      <ToggleGroupItem value='reception'>방문접수/출장</ToggleGroupItem>
      <ToggleGroupItem value='reservation'>예약</ToggleGroupItem>
      <ToggleGroupItem value='wifi'>무선인터넷</ToggleGroupItem>
      <ToggleGroupItem value='kids'>유아시설/놀이방</ToggleGroupItem>
      <ToggleGroupItem value='toilet'>남/녀 화장실 구분</ToggleGroupItem>
      <ToggleGroupItem value='chair'>유아의자</ToggleGroupItem>
      <ToggleGroupItem value='waiting'>대기공간</ToggleGroupItem>
      <ToggleGroupItem value='no-kids'>노키즈존</ToggleGroupItem>
    </ToggleGroup>
  ),
};
