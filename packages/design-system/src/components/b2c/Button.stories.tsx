import type { StoryObj } from '@storybook/react';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';

import { Button } from './Button';

const meta = {
  title: 'components/b2c/Button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    return (
      <Button size='small' variant='primary'>
        버튼
      </Button>
    );
  },
};

export const Outlined: Story = {
  render: () => {
    return (
      <Button size='small' variant='outlined'>
        버튼
      </Button>
    );
  },
};

export const Gray: Story = {
  render: () => {
    return (
      <Button size='small' variant='gray'>
        버튼
      </Button>
    );
  },
};

export const Large: Story = {
  render: () => {
    return (
      <Button size='large' variant='primary'>
        버튼
      </Button>
    );
  },
};

export const Banner: Story = {
  render: () => {
    return (
      <Button size='banner' variant='primary'>
        버튼
      </Button>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Button size='small' variant='primary' disabled>
        버튼
      </Button>
    );
  },
};

export const WithPrefixIcon: Story = {
  render: () => {
    return (
      <Button size='small' variant='primary'>
        <PlusIcon className='mr-2' size={18} />
        버튼
      </Button>
    );
  },
};

export const WithSuffixIcon: Story = {
  render: () => {
    return (
      <Button size='small' variant='primary'>
        버튼
        <ArrowRightIcon className='ml-2' size={18} />
      </Button>
    );
  },
};

export const AsChild: Story = {
  render: () => {
    return (
      <Button asChild size='small' variant='primary'>
        <a href='#'>링크</a>
      </Button>
    );
  },
};
export const Loading: Story = {
  render: () => {
    return (
      <Button asChild size='small' variant='loading'>
        버튼
      </Button>
    );
  },
};
