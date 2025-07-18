import type { StoryObj } from '@storybook/react';
import { ChipFilter } from './ChipFilter';

const meta = {
  title: 'components/b2c/ChipFilter',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  render: () => {
    return <ChipFilter active>필터</ChipFilter>;
  },
};

export const Inactive: Story = {
  render: () => {
    return <ChipFilter>필터</ChipFilter>;
  },
};

export const List: Story = {
  render: () => {
    return (
      <ChipFilter.List>
        <ChipFilter active>홍대/합정...외 2개</ChipFilter>
        <ChipFilter>지역</ChipFilter>
        <ChipFilter>카테고리</ChipFilter>
      </ChipFilter.List>
    );
  },
};

export const ScrollableList: Story = {
  render: () => {
    return (
      <div className='w-[375px]'>
        <ChipFilter.List scrollable>
          {Array.from({ length: 10 }, (_, index) => (
            <ChipFilter key={index} active={index === 0}>
              필터 {index + 1}
            </ChipFilter>
          ))}
        </ChipFilter.List>
      </div>
    );
  },
};

export const WrappedList: Story = {
  render: () => {
    return (
      <ChipFilter.List wrap>
        {Array.from({ length: 10 }, (_, index) => (
          <ChipFilter key={index} active={index === 0}>
            필터 {index + 1}
          </ChipFilter>
        ))}
      </ChipFilter.List>
    );
  },
};
