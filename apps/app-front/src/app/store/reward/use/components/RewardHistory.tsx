const RewardHistory = () => {
  return (
    <div className='pt-[60px] px-[70px]'>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-1 text-gray-700 body-4-2 text-left'>
            <th className='py-[16px] pl-[40px] w-[25%]'>적립시간</th>
            <th className='py-[16px] w-[15%]'>채널</th>
            <th className='py-[16px] w-[15%]'>종류</th>
            <th className='py-[16px] w-[25%]'>휴대폰번호</th>
            <th className='py-[16px] w-[10%]'>적립금</th>
          </tr>
        </thead>
        <tbody className='text-gray-800'>
          <tr className='border-b-1 border-gray-3 body-3'>
            <td className='py-[28px] pl-[40px]'>2025-04-12 23:23:12</td>
            <td className='py-[28px]'>매장</td>
            <td className='py-[28px]'>방문</td>
            <td className='py-[28px]'>01071120493</td>
            <td className='py-[28px]'>20P</td>
          </tr>
          <tr className='body-3'>
            <td className='py-[28px] pl-[40px]'>2025-04-12 23:23:12</td>
            <td className='py-[28px]'>매장</td>
            <td className='py-[28px]'>방문</td>
            <td className='py-[28px]'>01071120493</td>
            <td className='py-[28px]'>20P</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;
