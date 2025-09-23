import type { Meta, StoryObj } from '@storybook/react';
import { MenuButton } from './MenuButton';
import { Plus, Upload, Download, Settings } from 'lucide-react';

const meta: Meta<typeof MenuButton> = {
  title: 'Components/ceo/MenuButton',
  component: MenuButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '메뉴추가',
  },
};

export const WithCustomIcon: Story = {
  args: {
    children: '업로드',
    icon: <Upload className="h-5 w-5" />,
  },
};

export const WithoutIcon: Story = {
  args: {
    children: '아이콘 없음',
    icon: null,
  },
};

export const MultipleButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <MenuButton>
        메뉴추가
      </MenuButton>
      <MenuButton icon={<Upload className="h-5 w-5" />}>
        업로드
      </MenuButton>
      <MenuButton icon={<Download className="h-5 w-5" />}>
        다운로드
      </MenuButton>
      <MenuButton icon={<Settings className="h-5 w-5" />}>
        설정
      </MenuButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};

export const CustomWidth: Story = {
  args: {
    children: '넓은 버튼',
    className: 'w-full',
  },
};