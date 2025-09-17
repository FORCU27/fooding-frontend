'use client';

import { useId, useState } from 'react';

import { CircleAlertIcon } from 'lucide-react';
import { Slot } from 'radix-ui';

import { cn, createContext } from '../../utils';

type FormProps = React.ComponentPropsWithRef<'form'>;

const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>;
};

type FormLabelProps = React.ComponentPropsWithRef<'label'> & {
  required?: boolean;
};

const FormLabel = ({ className, children, required = false, ...props }: FormLabelProps) => {
  const { labelId, id, helperText } = useFormItemContext();

  return (
    <label
      id={labelId}
      htmlFor={id}
      className={cn('mb-5 w-fit subtitle-2', helperText && 'mb-2', className)}
      {...props}
    >
      {children}
      {required && <span className='text-info-blue'> *</span>}
    </label>
  );
};

const FormControl = ({ children }: { children: React.ReactNode }) => {
  const { error, id, labelId, errorMessageId, errorMessageElement } = useFormItemContext();

  return (
    <Slot.Root
      id={id}
      aria-labelledby={labelId}
      aria-describedby={cn(errorMessageElement && errorMessageId) || undefined}
      aria-invalid={error || undefined}
    >
      {children}
    </Slot.Root>
  );
};

type FormErrorMessageProps = React.ComponentPropsWithoutRef<'p'>;

const FormErrorMessage = ({ className, children, ...props }: FormErrorMessageProps) => {
  const { errorMessageId, setErrorMessageElement, error } = useFormItemContext();

  const refCallback = (node: HTMLParagraphElement | null) => {
    if (node) {
      setErrorMessageElement(node);
    }

    return () => {
      setErrorMessageElement(null);
    };
  };

  if (!error) return null;

  return (
    <p
      ref={refCallback}
      id={errorMessageId}
      className={cn('text-error-red mt-1 text-[15px] font-medium', className)}
      {...props}
    >
      {children}
    </p>
  );
};

type FormHelperTextProps = React.ComponentPropsWithRef<'p'>;

const FormHelperText = ({ className, children, ...props }: FormHelperTextProps) => {
  return (
    <p
      className={cn('mb-2 subtitle-7 flex items-center gap-1 text-info-blue', className)}
      {...props}
    >
      <CircleAlertIcon className='size-[14px]' />
      {children}
    </p>
  );
};

type FormItemProps = React.ComponentPropsWithRef<'div'> & {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
};

const FormItem = ({
  className,
  children,
  error = false,
  label,
  helperText,
  ...props
}: FormItemProps) => {
  const id = useId();
  const labelId = useId();
  const errorMessageId = useId();

  const [errorMessageElement, setErrorMessageElement] = useState<HTMLParagraphElement | null>(null);

  return (
    <FormItemContext
      value={{
        error,
        id,
        labelId,
        errorMessageId,
        errorMessageElement,
        helperText,
        setErrorMessageElement,
      }}
    >
      <div className={cn('flex flex-col', className)} {...props}>
        {label}
        {helperText}
        {children}
      </div>
    </FormItemContext>
  );
};

type FormItemContextValue = {
  id: string;
  labelId: string;
  errorMessageId: string;
  error: boolean;
  errorMessageElement: HTMLParagraphElement | null;
  setErrorMessageElement: (element: HTMLParagraphElement | null) => void;
  helperText?: React.ReactNode;
};

const [FormItemContext, useFormItemContext] = createContext<FormItemContextValue>('FormItem');

Form.Item = FormItem;
Form.Control = FormControl;
Form.Label = FormLabel;
Form.ErrorMessage = FormErrorMessage;
Form.HelperText = FormHelperText;

export { Form };
