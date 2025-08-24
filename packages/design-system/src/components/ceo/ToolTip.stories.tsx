import type { Meta, StoryObj } from '@storybook/react';
import { ToolTip } from './ToolTip';

const meta: Meta<typeof ToolTip> = {
  title: 'Components/ceo/ToolTip',
  component: ToolTip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '툴팁에 표시될 텍스트',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      '네이버,카카오페이,페이코,애플페이 등 QR코드결제 또는 바코드 결제가 가능한 경우 간편결제를 선택해주세요',
  },
};

export const Short: Story = {
  args: {
    children: '지도를 움직여 원하는 위치를 선택하세요',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: '커스텀 클래스가 적용된 툴팁입니다',
    className: 'mt-4',
  },
};
