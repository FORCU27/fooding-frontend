'use client';

const DevicesPage = () => {
  return (
    <div className='flex flex-col h-full w-full p-3 bg-white'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>기기관리</h1>
      <div className='flex flex-col justify-center items-start w-full gap-5'>
        <div className='flex flex-col border w-full p-3 gap-5'>
          <div>
            <p>device-R21322232</p>
            <p>ipad-12(OS 1.2.1)</p>
          </div>
          <div className='flex justify-between items-center'>
            <div>웨이팅 - 관리</div>
            <div className='text-right'>
              <p>설치 일자 2025-02-01 23:23:12</p>
              <p>마지막 접속 일자 2025-02-01 23:23:12</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col border w-full p-3'>
          <div>
            <p>device-R21322232</p>
            <p>ipad-12(OS 1.2.1)</p>
          </div>
          <div className='flex justify-between items-center'>
            <div>웨이팅 - 접수</div>
            <div className='text-right'>
              <p>설치 일자 2025-02-01 23:23:12</p>
              <p>마지막 접속 일자 2025-02-01 23:23:12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicesPage;
