import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type CardFormProps = {
  children: ReactNode;
  className?: string;
};

const CardForm = ({ children, className }: CardFormProps) => {
  return <form className={cn('flex flex-col gap-8', className)}>{children}</form>;
};

export { CardForm };
