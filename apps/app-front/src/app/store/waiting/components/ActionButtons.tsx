import Button from '@/components/Button';

export const ActionButtons = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='flex gap-4 mt-12'>
      <Button size='sm' variant='default' onClick={onClick}>
        바로 줄서기
      </Button>
      <button className='px-8 py-4 subtitle-2-2 text-gray-5 rounded-full bg-background-primary  border-3 border-gray-3'>
        웨이팅 목록
      </button>
    </div>
  );
};
