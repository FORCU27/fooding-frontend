import Button from '@/components/Button';

interface ActionButtonsProps {
  onClick: () => void;
  onClickWaitingList?: () => void;
}

export const ActionButtons = ({ onClick, onClickWaitingList }: ActionButtonsProps) => {
  return (
    <div className='flex gap-4 mt-12'>
      <Button size='sm' variant='default' onClick={onClick}>
        바로 줄서기
      </Button>
      <button
        className='px-8 py-4 subtitle-2-2 text-gray-5 rounded-full bg-background-primary border-3 border-gray-3 cursor-pointer hover:bg-gray-100 transition-colors'
        onClick={onClickWaitingList}
      >
        웨이팅 목록
      </button>
    </div>
  );
};
