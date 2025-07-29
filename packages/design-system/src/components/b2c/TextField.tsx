'use client';

import React, { useId, useState } from 'react';

import { cn } from '../../utils/cn';
import { createContext } from '../../utils/create-context';

type TextFieldProps = Omit<React.ComponentPropsWithRef<'div'>, 'onChange' | 'value'> & {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: boolean;
  errorMessage?: React.ReactNode;
  required?: boolean;
};

const TextField = ({
  value: externalValue,
  onChange: externalOnChange,
  defaultValue,
  className,
  children,
  label,
  description,
  required,
  error,
  errorMessage,
  ...props
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const value = externalValue ?? internalValue;
  const onChange = externalOnChange ?? setInternalValue;

  const textFieldId = useId();
  const descriptionId = useId();
  const errorMessageId = useId();

  const [descriptionElement, setDescriptionElement] = useState<HTMLParagraphElement | null>(null);
  const [errorMessageElement, setErrorMessageElement] = useState<HTMLParagraphElement | null>(null);

  const contextValue = {
    value,
    onChange,
    defaultValue,
    required,
    error,
    textFieldId,
    descriptionId,
    errorMessageId,
    descriptionElement,
    errorMessageElement,
    setDescriptionElement,
    setErrorMessageElement,
  };

  return (
    <TextFieldContext value={contextValue}>
      <div className={cn('flex w-full flex-col', className)} {...props}>
        {label}
        <div
          className={cn(
            'border-gray-2 bg-white flex rounded-[12px] border',
            'focus-within:border-gray-5',
            'has-data-invalid:focus-within:border-error-red has-data-invalid:border-error-red',
            'has-data-disabled:opacity-50 has-data-disabled:pointer-events-none',
          )}
        >
          {children}
        </div>
        {(description || (error && errorMessage)) && (
          <div className='mt-1 flex justify-end gap-3'>
            <div className='flex-1'>
              {description && description}
              {error && errorMessage}
            </div>
          </div>
        )}
      </div>
    </TextFieldContext>
  );
};

type TextFieldInputProps = React.ComponentPropsWithRef<'input'>;

const TextFieldInput = ({ className, ...props }: TextFieldInputProps) => {
  const { register } = useRegisterTextField();

  return (
    <input
      className={cn('outline-hidden text-black placeholder-gray-4 w-full px-5 h-[56px]', className)}
      data-disabled={props.disabled}
      data-readonly={props.readOnly}
      {...register}
      {...props}
    />
  );
};

type TextFieldTextareaProps = React.ComponentPropsWithRef<'textarea'>;

const TextFieldTextarea = ({ className, ...props }: TextFieldTextareaProps) => {
  const { register } = useRegisterTextField();

  return (
    <textarea
      className={cn(
        'outline-hidden text-black placeholder-gray-4 w-full px-4 py-3 text-base',
        'min-h-[152px]',
        'field-sizing-content',
        className,
      )}
      data-disabled={props.disabled}
      data-readonly={props.readOnly}
      {...register}
      {...props}
    />
  );
};

type TextFieldAdornmentProps = React.ComponentPropsWithRef<'div'>;

const TextFieldPrefix = ({ className, children, ...props }: TextFieldAdornmentProps) => {
  return (
    <div className={cn('flex items-center justify-center pl-3', className)} {...props}>
      {children}
    </div>
  );
};

const TextFieldSuffix = ({ className, children, ...props }: TextFieldAdornmentProps) => {
  return (
    <div className={cn('flex items-center justify-center pr-3', className)} {...props}>
      {children}
    </div>
  );
};

const TextFieldLabel = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'label'>) => {
  const { textFieldId } = useTextFieldContext();

  return (
    <label
      htmlFor={textFieldId}
      className={cn('mb-3 flex items-center text-sm font-semibold text-gray-5', className)}
      {...props}
    >
      {children}
    </label>
  );
};

type TextFieldDescriptionProps = React.ComponentPropsWithRef<'p'>;

const TextFieldDescription = ({ className, children, ...props }: TextFieldDescriptionProps) => {
  const { descriptionId, setDescriptionElement } = useTextFieldContext();

  const refCallback = (node: HTMLParagraphElement | null) => {
    if (node) {
      setDescriptionElement(node);
    }

    return () => {
      setDescriptionElement(null);
    };
  };

  return (
    <p
      id={descriptionId}
      ref={refCallback}
      className={cn('text-gray-4 flex-1 text-sm font-medium', className)}
      {...props}
    >
      {children}
    </p>
  );
};

type TextFieldErrorMessageProps = React.ComponentPropsWithRef<'p'>;

const TextFieldErrorMessage = ({ className, children, ...props }: TextFieldErrorMessageProps) => {
  const { errorMessageId, setErrorMessageElement } = useTextFieldContext();

  const refCallback = (node: HTMLParagraphElement | null) => {
    if (node) {
      setErrorMessageElement(node);
    }

    return () => {
      setErrorMessageElement(null);
    };
  };

  return (
    <p
      id={errorMessageId}
      ref={refCallback}
      className={cn('text-error-red mt-1 flex-1 text-sm font-medium', className)}
      {...props}
    >
      {children}
    </p>
  );
};

type TextFieldContextValue = {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  required?: boolean;
  error?: boolean;
  textFieldId: string;
  errorMessageId: string;
  descriptionId: string;
  descriptionElement: HTMLParagraphElement | null;
  errorMessageElement: HTMLParagraphElement | null;
  setDescriptionElement: (element: HTMLParagraphElement | null) => void;
  setErrorMessageElement: (element: HTMLParagraphElement | null) => void;
};

const [TextFieldContext, useTextFieldContext] = createContext<TextFieldContextValue>('');

const useRegisterTextField = () => {
  const {
    textFieldId,
    value,
    onChange,
    error,
    descriptionElement,
    errorMessageElement,
    errorMessageId,
    descriptionId,
  } = useTextFieldContext();

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const register = {
    id: textFieldId,
    value,
    onChange: onFieldChange,
    'aria-invalid': error || undefined,
    'data-invalid': error || undefined,
    'aria-describedby': cn(
      descriptionElement && descriptionId,
      errorMessageElement && errorMessageId,
    ),
  };

  return { register };
};

TextField.Input = TextFieldInput;
TextField.Textarea = TextFieldTextarea;
TextField.Prefix = TextFieldPrefix;
TextField.Suffix = TextFieldSuffix;
TextField.Label = TextFieldLabel;
TextField.Description = TextFieldDescription;
TextField.ErrorMessage = TextFieldErrorMessage;

export { TextField };
