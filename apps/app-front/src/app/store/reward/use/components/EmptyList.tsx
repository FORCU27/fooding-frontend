import Image from 'next/image';

interface EmptyListProps {
  message?: string;
  className?: string;
}

const EmptyList = ({ message = '내용이 비어있어요!', className = '' }: EmptyListProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Image src='/images/empty.png' alt='empty list' width={135} height={168} />
      <p className='text-gray-4 subtitle-3 mt-2'>{message}</p>
    </div>
  );
};

export default EmptyList;
