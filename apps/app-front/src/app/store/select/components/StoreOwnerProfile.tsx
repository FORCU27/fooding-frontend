import Image from 'next/image';

interface StoreOwnerProfileProps {
  ownerName: string;
  profileImageSrc: string;
}

export default function StoreOwnerProfile({ ownerName, profileImageSrc }: StoreOwnerProfileProps) {
  return (
    <div className='flex flex-col items-center justify-center bg-neutral-900 text-white w-2/5 h-screen relative'>
      <button className='absolute top-4 left-4 text-2xl'>←</button>
      <p className='text-lg'>안녕하세요</p>
      <h1 className='text-2xl font-bold'>{ownerName} 사장님</h1>
      <div className='rounded-full overflow-hidden mt-4 w-48 h-48'>
        <Image src={profileImageSrc} alt='사장님 프로필' width={192} height={192} />
      </div>
    </div>
  );
}
