import type { Meta, StoryObj } from '@storybook/react';
import { CeoUrlLinkList } from './CeoUrlLinkList';

const meta = {
  title: 'Components/ceo/CeoUrlLinkList',
  component: CeoUrlLinkList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CeoUrlLinkList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialUrls: ['https://www.naver.com/', 'https://www.google.com/'],
  },
};
