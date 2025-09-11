import type { Meta, StoryObj } from '@storybook/react';
import { MenuBoard } from './MenuBoard';
import { Card } from './Card';

const meta: Meta<typeof MenuBoard> = {
  title: 'Components/ceo/MenuBoard',
  component: MenuBoard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onCategoriesChange: { action: 'categoriesChanged' },
    onSave: { action: 'saved' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCategories = [
  {
    id: 'cat-1',
    name: '기본',
    items: [
      {
        id: 'item-1',
        name: '삼겹살',
        description: '바삭하게 구워 한입 가득 고소함을 느끼는 국민 고기',
        price: 99999,
        badges: ['대표'] as Array<'대표' | '추천' | '신규'>,
        image: '',
      },
      {
        id: 'item-2',
        name: '된장찌개',
        description: '구수하고 진한 국물로 마무리하는 최고의 한 그릇',
        price: 4500,
        badges: ['신규'] as Array<'대표' | '추천' | '신규'>,
        image: '',
      },
    ],
  },
  {
    id: 'cat-2',
    name: '사이드',
    items: [
      {
        id: 'item-3',
        name: '냉면',
        description: '고기의 느끼함을 확 잡아주는 시원한 별미',
        price: 7800,
        badges: ['추천'] as Array<'대표' | '추천' | '신규'>,
        image: '',
      },
      {
        id: 'item-4',
        name: '볶음밥',
        description: '구운 고기에 볶음밥까지 완벽한 마무리',
        price: 7800,
        image: '',
      },
    ],
  },
  {
    id: 'cat-3',
    name: '음료',
    items: [
      {
        id: 'item-5',
        name: '계란찜',
        description: '폭신하고 부드럽게 입안을 달래주는 사이드',
        price: 7800,
        image: '',
      },
      {
        id: 'item-6',
        name: '공기밥',
        description: '따끈한 밥 한 숟갈로 고기와 완벽한 조합',
        price: 7800,
        image: '',
      },
    ],
  },
];

export const Default: Story = {
  args: {
    categories: sampleCategories,
  },
  render: (args) => (
    <Card>
      <MenuBoard {...args} />
    </Card>
  ),
};
