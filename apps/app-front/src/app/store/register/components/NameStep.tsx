interface NameStepProps {
  formData: {
    name: string;
  };
  updateFormData: (key: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function NameStep({ formData, updateFormData, onNext, onPrev }: NameStepProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('name', e.target.value);
  };

  const isValid = formData.name.trim().length > 0;

  return (
    <div className='min-h-screen flex flex-col pb-[80px]'>
      <div className='flex-1 space-y-4 p-4'>
        <h2 className='text-xl font-semibold mb-6 text-center'>이름을 입력해주세요</h2>
        <p className='text-sm text-gray-500 mb-4'>입장 순서가 되면 이름을 불러드릴게요.</p>

        <div>
          <input
            type='text'
            value={formData.name}
            onChange={handleNameChange}
            placeholder='김주영'
            className='w-full p-3 border border-gray-300 rounded-lg'
          />
          <p className='text-sm text-blue-500 mt-2'>
            방문한 적 있는 매장이에요! 본인 이름이 아니라면 수정해주세요.
          </p>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t'>
        <div className='flex gap-4'>
          <button onClick={onPrev} className='flex-1 py-4 rounded-lg border border-gray-300'>
            이전
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`flex-1 py-4 rounded-lg ${
              isValid ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
