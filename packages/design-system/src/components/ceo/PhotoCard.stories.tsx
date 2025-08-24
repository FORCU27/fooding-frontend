import type { Meta, StoryObj } from '@storybook/react';
import PhotoCard from './PhotoCard';

// 샘플 이미지
const IMG =
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop';

const meta: Meta<typeof PhotoCard> = {
  title: 'Components/ceo/PhotoCard',
  component: PhotoCard,
  args: {
    src: IMG,
    alt: '맛있는 음식 사진',
    isVideo: false,
    isRepresentative: false,
    onSetRepresentative: () => console.log('대표사진 지정'),
    onPlayVideo: () => console.log('동영상 재생'),
    onDelete: () => console.log('삭제'),
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className='max-w-[360px]'>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PhotoCard>;

export const Default: Story = {};

export const Representative: Story = {
  args: { isRepresentative: true },
};

export const Video: Story = {
  args: { isVideo: true },
};

export const AllBadges: Story = {
  args: {
    isVideo: true,
    isRepresentative: true,
  },
};
