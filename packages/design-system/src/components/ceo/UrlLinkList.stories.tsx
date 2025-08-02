import type { Meta, StoryObj } from '@storybook/react';
import { UrlLinkList } from './UrlLinkList';

const meta = {
  title: 'Components/ceo/UrlLinkList',
  component: UrlLinkList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UrlLinkList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialUrls: ['https://www.naver.com/', 'https://www.google.com/'],
  },
};
