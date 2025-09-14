import { cn } from '../../utils/cn';

type DeviceType = 'android' | 'ios';

type DeviceCardProps = {
  deviceName: string;
  deviceId: string;
  deviceModel: string;
  deviceType: DeviceType;
  osVersion: string;
  lastAccessDate: string;
  createdDate: string;
  isActive?: boolean;
  className?: string;
};

const DeviceCard = ({
  deviceName,
  deviceId,
  deviceModel,
  deviceType,
  osVersion,
  lastAccessDate,
  createdDate,
  isActive = false,
  className,
}: DeviceCardProps) => {
  const deviceIcon = deviceType === 'android' ? '🤖' : '🍎';

  return (
    <div
      className={cn(
        'rounded-[20px] border bg-white p-8 shadow-sm min-w-[704px] max-w-[1080px]',
        isActive ? 'border-2 border-fooding-purple' : 'border-gray-200',
        className,
      )}
    >
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='mb-1 text-xl font-semibold text-black'>{deviceName}</h3>
          <p className='text-lg text-gray-5'>{deviceId}</p>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-2xl'>{deviceIcon}</span>
          <div className='text-right'>
            <p className='text-base text-gray-5'>{deviceModel}</p>
            <p className='text-base text-gray-5'>(android {osVersion})</p>
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-2 mt-[105px]'>
        <div className='flex flex-col gap-2 justify-end items-end'>
          <p className='text-base text-black'>마지막 접속 일자</p>
          <p className='text-base text-black'>설치 일자</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <p className='text-base'>
            <span className='text-black'>{createdDate.split(' ')[0]}</span>
            <span className='text-gray-5 ml-2'> {createdDate.split(' ').slice(1).join(' ')}</span>
          </p>
          <p className='text-base'>
            <span className='text-black'>{lastAccessDate.split(' ')[0]}</span>
            <span className='text-gray-5 ml-2'>
              {' '}
              {lastAccessDate.split(' ').slice(1).join(' ')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export { DeviceCard };
export type { DeviceCardProps, DeviceType };
