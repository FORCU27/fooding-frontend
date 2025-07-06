import { ChevronDownIcon, SettingsIcon } from 'lucide-react';

import { useMSWProviderContext } from './MSWProvider';
import { BASE_URL } from '../config';
import { Sheet } from './Sheet';
import { Switch } from './Switch';
import { mockHandlerGroups } from '../handlers/index';
import { matchHandler, MockHandler } from '../utils/mock';

export const MSWDevtool = () => {
  return (
    <Sheet>
      <Sheet.Trigger
        className='fixed bottom-4 right-4 z-50 flex justify-center items-center rounded-full size-8 bg-primary-pink text-white shadow-lg cursor-pointer hover:bg-primary-pink/90 transition-colors'
        aria-label='MSW 설정 열기'
      >
        <SettingsIcon className='size-4.5' />
      </Sheet.Trigger>
      <Sheet.Content className='w-[560px]'>
        <Sheet.Header>
          <Sheet.Title>MSW 설정</Sheet.Title>
          <Sheet.Description>MSW 핸들러 활성화 여부를 설정할 수 있습니다.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Body>
          <div className='flex flex-col gap-6 mt-2'>
            {mockHandlerGroups.map((handlerGroup, index) => (
              <div key={index} className='flex flex-col'>
                <span className='text-gray-4 text-xs font-medium mb-2'>
                  {handlerGroup.baseUrl.replace(BASE_URL, '').slice(1).toUpperCase()}
                </span>
                <ul className='flex flex-col gap-3'>
                  {handlerGroup.handlers.map((handler, index) => (
                    <ApiEndpoint key={index} handler={handler} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  );
};

type ApiEndpointProps = {
  handler: MockHandler;
};

const ApiEndpoint = ({ handler }: ApiEndpointProps) => {
  const { handlerConfig, toggleHandlerEnabled, changePreset } = useMSWProviderContext();

  const isEnabled = handlerConfig.enabledHandlers.some((enabledHander) =>
    matchHandler(enabledHander, handler),
  );

  const preset =
    handlerConfig.enabledHandlers.find((h) => matchHandler(h, handler))?.preset ??
    handler.presets[0].label;

  const onPresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = handler.presets.find((p) => p.label === e.target.value);

    if (selectedPreset) {
      changePreset({
        method: handler.method,
        path: handler.path,
        preset: selectedPreset.label,
      });
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-2 flex-1'>
        <span className='text-xs px-1.5 flex justify-center items-center bg-primary-pink text-white rounded-md font-medium h-5'>
          {handler.method}
        </span>
        <div className='flex gap-0.5'>
          {handler.path
            .replace(BASE_URL, '')
            .split('/')
            .map((part, index) => (
              <div key={index} className='font-medium text-sm flex items-center gap-0.5'>
                {part.startsWith(':') ? (
                  <span className='bg-gray-1 px-1.5 h-5 flex justify-center items-center rounded-[0.375rem]'>
                    {part.slice(1)}
                  </span>
                ) : (
                  <span>{part}</span>
                )}
                {index < handler.path.split('/').length - 3 && (
                  <span className='text-gray-4'>/</span>
                )}
              </div>
            ))}
        </div>
      </div>
      {isEnabled && (
        <div className='relative'>
          <select
            className='flex justify-center items-center h-6 bg-gray-1 text-xs font-medium px-2 rounded-[0.375rem] cursor-pointer transition-colors pr-6.5 max-w-[6rem] truncate appearance-none'
            value={preset}
            onChange={onPresetChange}
          >
            {handler.presets.map((preset) => (
              <option key={preset.label} value={preset.label}>
                {preset.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className='absolute top-1/2 -translate-y-1/2 right-2 size-3.5 pointer-events-none' />
        </div>
      )}
      <Switch checked={isEnabled} onChange={() => toggleHandlerEnabled(handler)} />
    </div>
  );
};
