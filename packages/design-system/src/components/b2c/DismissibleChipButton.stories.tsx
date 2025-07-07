import type { StoryObj } from '@storybook/react';
import { DismissibleChipButton } from './DismissibleChipButton';
import { useState } from 'react';

const meta = {
  title: 'components/b2c/DismissibleChipButton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return <DismissibleChipButton>레이블</DismissibleChipButton>;
  },
};

export const WithList: Story = {
  render: () => {
    const initialList = ['1', '2', '3', '4'];

    const [list, setList] = useState<string[]>(initialList);

    return (
      <div className='flex flex-wrap gap-2'>
        {list.map((value) => (
          <DismissibleChipButton
            key={value}
            onClick={() => setList((prev) => prev.filter((v) => v !== value))}
          >
            레이블 {value + 1}
          </DismissibleChipButton>
        ))}
      </div>
    );
  },
};
