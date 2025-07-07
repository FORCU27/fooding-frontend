import type { StoryObj } from '@storybook/react';
import { DismissableChipButton } from './DismissableChipButton';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/DismissableChipButton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <DismissableChipButton>레이블</DismissableChipButton>;
  },
};

export const WithList: Story = {
  render: () => {
    const initialList = ['1', '2', '3', '4'];

    const [list, setList] = useState<string[]>(initialList);

    return (
      <div className='flex flex-wrap gap-2'>
        {list.map((value) => (
          <DismissableChipButton
            key={value}
            onClick={() => setList((prev) => prev.filter((v) => v !== value))}
          >
            레이블 {value + 1}
          </DismissableChipButton>
        ))}
      </div>
    );
  },
};
