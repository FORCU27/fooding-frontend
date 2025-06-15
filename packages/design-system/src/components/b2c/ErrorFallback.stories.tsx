import type { StoryObj } from '@storybook/react';
import { ErrorFallback } from './ErrorFallback';

const meta = {
  title: 'components/b2c/ErrorFallback',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <ErrorFallback className='my-[120px]'>
        <ErrorFallback.Title>에러가 발생했습니다.</ErrorFallback.Title>
        <ErrorFallback.Description>
          {'잠시 후 다시 시도해주세요.\n문제가 지속되면 고객센터로 문의해주세요.'}
        </ErrorFallback.Description>
        <ErrorFallback.Actions>
          <ErrorFallback.Action variant='gray'>홈으로 돌아가기</ErrorFallback.Action>
          <ErrorFallback.Action>고객센터 문의하기</ErrorFallback.Action>
        </ErrorFallback.Actions>
      </ErrorFallback>
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    return (
      <ErrorFallback className='my-[120px]'>
        <ErrorFallback.Title>알림 목록을 불러오지 못했어요.</ErrorFallback.Title>
        <ErrorFallback.Actions>
          <ErrorFallback.Action>새로고침</ErrorFallback.Action>
        </ErrorFallback.Actions>
      </ErrorFallback>
    );
  },
};
