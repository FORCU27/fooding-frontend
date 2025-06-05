import type { StoryObj } from '@storybook/react';

import { NavButton } from './NavButton';
import { ChevronLeftIcon } from '../../icons';
import { ShareIcon } from 'lucide-react';

const meta = {
  title: 'components/b2c/NavButton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Back: Story = {
  render: () => {
    return (
      <NavButton>
        <ChevronLeftIcon size={28} />
      </NavButton>
    );
  },
};

export const Share: Story = {
  render: () => {
    return (
      <NavButton>
        <ShareIcon size={20} />
      </NavButton>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <NavButton disabled>
        <ChevronLeftIcon size={28} />
      </NavButton>
    );
  },
};
