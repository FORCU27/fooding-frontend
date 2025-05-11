import { WaitingRegisterData, UpdateWaitingRegisterData, StepProps } from '../types';
import Button from '@/components/Button';

export function NameStep({ formData, updateFormData, onNext, onPrev }: StepProps) {
  const { name } = formData;
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('name', e.target.value);
  };

  const isValid = formData.name.trim().length > 0;

  return (
    <div className='flex flex-col pb-[80px]'>
      <div className='flex-1 space-y-4 p-4'>
        <h2 className='headline-2 mb-6 text-center'>이름 입력</h2>
        <p className='fs-body-2 text-gray-5'>입장시 호명될 닉네임 또는 이름을 입력해주세요</p>

        <div>
          <input
            type='text'
            value={formData.name}
            onChange={handleNameChange}
            placeholder='강주영'
            className='w-full p-3 border border-gray-300 rounded-lg'
          />
        </div>
      </div>
      <Button size='sm' variant={isValid ? 'default' : 'disabled'} className=''>
        줄서기
      </Button>
    </div>
  );
}
