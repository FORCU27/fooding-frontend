import type { StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';
import { useState } from 'react';

const meta = {
  title: 'Components/ceo/ToggleGroup',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type='single' defaultValue='possible' className='w-[400px]' fullWidth>
      <ToggleGroupItem value='possible'>가능해요</ToggleGroupItem>
      <ToggleGroupItem value='impossible'>불가능해요</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type='multiple' className='w-[600px]'>
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

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('possible');

    return (
      <ToggleGroup
        type='single'
        className='w-[400px]'
        fullWidth
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem value='possible'>가능해요</ToggleGroupItem>
        <ToggleGroupItem value='impossible'>불가능해요</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
