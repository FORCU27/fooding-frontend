import type { StoryObj } from '@storybook/react';
import { ChipButton } from './ChipButton';

const meta = {
  title: 'components/b2c/ChipButton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  render: () => {
    return <ChipButton variant='contained'>버튼</ChipButton>;
  },
};

export const Outlined: Story = {
  render: () => {
    return <ChipButton variant='outlined'>버튼</ChipButton>;
  },
};

export const WithChevronDownIcon: Story = {
  render: () => {
    return (
      <ChipButton variant='contained' suffix={<ChipButton.ChevronDownIcon />}>
        버튼
      </ChipButton>
    );
  },
};
