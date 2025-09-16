import Link from 'next/link';

import { Checkbox } from '@repo/design-system/components/b2c';

import { cn } from '@/utils/cn';

interface AgreementCheckBoxProps {
  label: string;
  link: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const AgreementCheckBox = ({
  label,
  link,
  checked,
  onChange,
  className,
}: AgreementCheckBoxProps) => (
  <div className={cn('w-full flex flex-col my-2 gap-2', className)}>
    <Checkbox.Label>
      <Checkbox checked={checked} className='min-w-5' onChange={onChange} />
      <div className='flex justify-between items-center w-full subtitle-6 gap-2'>
        <Checkbox.LabelText className='truncate text-gray-6'>{label}</Checkbox.LabelText>
        <Link
          href={link}
          className='underline whitespace-nowrap text-gray-6'
          target='_blank'
          rel='noopener noreferrer'
        >
          자세히
        </Link>
      </div>
    </Checkbox.Label>
  </div>
);
