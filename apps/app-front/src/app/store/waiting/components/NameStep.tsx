import { WaitingRegisterData, UpdateWaitingRegisterData, StepProps } from '../types';
import Button from '@/components/Button';

export function NameStep({ formData, updateFormData, onNext, onPrev }: StepProps) {
  const { name } = formData;
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('name', e.target.value);
  };

  const isValid = formData.name.trim().length > 0;

  return (
    <div className='flex flex-col items-center '>
      <div className='flex flex-col items-center'>
        <h2 className='headline-5 mb-2 text-center'>이름 입력</h2>
        <p className='body-2-1 text-gray-5 mb-[70px]'>
          입장시 호명될 닉네임 또는 이름을 입력해주세요
        </p>

        <div className='w-[404px] h-[102px] mb-[302px] border-2 border-gray-300 rounded-[8px] flex items-center justify-center'>
          <input
            type='text'
            value={formData.name}
            onChange={handleNameChange}
            placeholder='강주영'
            className='w-[250px] text-center subtitle-3 pb-3 mb-5 pt-[34px] border-0 border-b-4 border-gray-300 rounded-none focus:ring-0 focus:border-gray-400'
          />
        </div>
      </div>
      <Button size='sm' variant={isValid ? 'default' : 'disabled'} className=''>
        줄서기
      </Button>
    </div>
  );
}
