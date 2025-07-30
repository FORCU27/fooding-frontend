import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '../../utils/cn';

type CardFormProps = ComponentPropsWithRef<'form'> & {
  children: ReactNode;
  className?: string;
};

const CardForm = ({ children, className, ...props }: CardFormProps) => {
  return <form className={cn('flex flex-col gap-8', className)} {...props}>{children}</form>;
};

export { CardForm };
