import type { ReactNode } from 'react';

type CeoNameInputProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  children: ReactNode;
};

const CeoCarnSubtitle = ({ label, required = false, children }: CeoNameInputProps) => {
  return (
    <div className='grid w-full gap-[20px]'>
      <label htmlFor='name' className='subtitle-2'>
        {label}
        {required && <span className='text-[#0080F8]'> *</span>}
      </label>
      {children}
    </div>
  );
};

export { CeoCarnSubtitle };
