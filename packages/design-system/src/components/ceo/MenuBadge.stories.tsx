import type { Meta, StoryObj } from '@storybook/react';
import { MenuBadge, MenuBadgeList } from './MenuBadge';

const meta: Meta<typeof MenuBadge> = {
  title: 'Components/ceo/MenuBadge',
  component: MenuBadge,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Representative: Story = {
  args: {
    type: '대표',
  },
};

export const Recommended: Story = {
  args: {
    type: '추천',
  },
};

export const New: Story = {
  args: {
    type: '신규',
  },
};

const metaList: Meta<typeof MenuBadgeList> = {
  title: 'Components/ceo/MenuBadgeList',
  component: MenuBadgeList,
  parameters: {
    layout: 'centered',
  },
};

export const BadgeList: StoryObj<typeof MenuBadgeList> = {
  args: {
    badges: ['대표', '추천', '신규'],
  },
  render: (args) => <MenuBadgeList {...args} />,
};

export const SingleBadge: StoryObj<typeof MenuBadgeList> = {
  args: {
    badges: ['대표'],
  },
  render: (args) => <MenuBadgeList {...args} />,
};

export const EmptyBadges: StoryObj<typeof MenuBadgeList> = {
  args: {
    badges: [],
  },
  render: (args) => <MenuBadgeList {...args} />,
};