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
  success?: boolean;
  successMessage?: React.ReactNode;
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
  success,
  successMessage,
  ...props
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const value = externalValue ?? internalValue;
  const onChange = externalOnChange ?? setInternalValue;

  const textFieldId = useId();
  const descriptionId = useId();
  const errorMessageId = useId();
  const successMessageId = useId();

  const [descriptionElement, setDescriptionElement] = useState<HTMLParagraphElement | null>(null);
  const [errorMessageElement, setErrorMessageElement] = useState<HTMLParagraphElement | null>(null);
  const [successMessageElement, setSuccessMessageElement] = useState<HTMLParagraphElement | null>(
    null,
  );

  const contextValue = {
    value,
    onChange,
    defaultValue,
    required,
    error,
    success,
    textFieldId,
    descriptionId,
    errorMessageId,
    successMessageId,
    descriptionElement,
    errorMessageElement,
    successMessageElement,
    setDescriptionElement,
    setErrorMessageElement,
    setSuccessMessageElement,
  };

  return (
    <TextFieldContext value={contextValue}>
      <div className={cn('flex w-full flex-col', className)} {...props}>
        {label}
        <div
          className={cn(
            'bg-white flex rounded-[12px] border',
            error
              ? 'border-error-red focus-within:border-error-red'
              : success
                ? 'border-success-green focus-within:border-success-green'
                : 'border-gray-2 focus-within:border-gray-5',
            'has-data-disabled:opacity-50 has-data-disabled:pointer-events-none',
          )}
        >
          {children}
        </div>
        {(description || errorMessage || successMessage) && (
          <div className='mt-1 flex justify-end gap-3'>
            <div className='flex-1'>
              {description && <TextField.Description>{description}</TextField.Description>}
              {error && errorMessage && (
                <TextField.ErrorMessage>{errorMessage}</TextField.ErrorMessage>
              )}
              {success && successMessage && (
                <TextField.SuccessMessage>{successMessage}</TextField.SuccessMessage>
              )}
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
      className={cn('mb-3 flex items-center subtitle-6', className)}
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
    <div
      id={errorMessageId}
      ref={refCallback}
      className={cn('text-error-red mt-1 flex-1 text-sm font-medium', className)}
      {...props}
    >
      {children}
    </div>
  );
};

type TextFieldSuccessMessageProps = React.ComponentPropsWithRef<'p'>;

const TextFieldSuccessMessage = ({
  className,
  children,
  ...props
}: TextFieldSuccessMessageProps) => {
  const { successMessageId, setSuccessMessageElement } = useTextFieldContext();

  const refCallback = (node: HTMLParagraphElement | null) => {
    if (node) {
      setSuccessMessageElement(node);
    }
    return () => {
      setSuccessMessageElement(null);
    };
  };

  return (
    <div
      id={successMessageId}
      ref={refCallback}
      className={cn('text-success-green mt-1 flex-1 text-sm font-medium', className)}
      {...props}
    >
      {children}
    </div>
  );
};

type TextFieldContextValue = {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  required?: boolean;
  error?: boolean;
  success?: boolean;
  textFieldId: string;
  errorMessageId: string;
  successMessageId: string;
  descriptionId: string;
  descriptionElement: HTMLParagraphElement | null;
  errorMessageElement: HTMLParagraphElement | null;
  successMessageElement: HTMLParagraphElement | null;
  setDescriptionElement: (element: HTMLParagraphElement | null) => void;
  setErrorMessageElement: (element: HTMLParagraphElement | null) => void;
  setSuccessMessageElement: (element: HTMLParagraphElement | null) => void;
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
    successMessageElement,
    errorMessageId,
    successMessageId,
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
      successMessageElement && successMessageId,
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
TextField.SuccessMessage = TextFieldSuccessMessage;

export { TextField };
