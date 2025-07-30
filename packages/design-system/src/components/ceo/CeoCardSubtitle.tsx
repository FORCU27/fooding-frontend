import type { ReactNode } from 'react';

type CeoCardSubtitleProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

const CeoCardSubtitle = ({ label, required = false, children }: CeoCardSubtitleProps) => {
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

export { CeoCardSubtitle };
