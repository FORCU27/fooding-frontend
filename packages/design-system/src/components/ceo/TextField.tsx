'use client';

import React, { useId, useState } from 'react';

import { cn, createContext } from '../../utils';

type TextFieldProps = Omit<React.ComponentPropsWithRef<'div'>, 'onChange' | 'value'> & {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  label?: React.ReactNode;
  error?: boolean;
  errorMessage?: React.ReactNode;
  maxGraphemeCount?: number;
  required?: boolean;
  format?: FormatOption;
};

const TextField = ({
  value: externalValue,
  onChange: externalOnChange,
  defaultValue,
  className,
  children,
  label,
  maxGraphemeCount,
  required,
  error,
  errorMessage,
  format,
  ...props
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const value = externalValue ?? internalValue;
  const onChange = externalOnChange ?? setInternalValue;

  const textFieldId = useId();
  const errorMessageId = useId();

  const [errorMessageElement, setErrorMessageElement] = useState<HTMLParagraphElement | null>(null);

  const contextValue = {
    value,
    onChange,
    defaultValue,
    required,
    maxGraphemeCount,
    error,
    textFieldId,
    errorMessageId,
    errorMessageElement,
    setErrorMessageElement,
    format,
  };

  return (
    <TextFieldContext value={contextValue}>
      <div className={cn('flex w-full flex-col', className)} {...props}>
        {label}
        <div
          className={cn(
            'border-gray-3 bg-white flex min-h-[58px] rounded-[8px] border',
            'focus-within:border-fooding-purple',
            'has-data-invalid:focus-within:border-error-red has-data-invalid:border-error-red',
            'has-data-disabled:pointer-events-none has-data-disabled:opacity-50',
          )}
        >
          {children}
        </div>
        {(maxGraphemeCount || (error && errorMessage)) && (
          <div className='mt-2 flex justify-end gap-3'>
            <div className='flex-1'>{error && errorMessage}</div>
            {maxGraphemeCount && (
              <span
                className={cn('text-gray-5 inline-flex gap-1 text-[12px] font-semibold', className)}
                {...props}
              >
                <span className='gray-6'>{value.length}</span>
                <span>/</span>
                <span>{maxGraphemeCount}자</span>
              </span>
            )}
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
      className={cn(
        'outline-hidden text-main placeholder-gray-4 w-full px-4 font-medium',
        className,
      )}
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
        'outline-hidden text-main placeholder-gray-4 w-full px-5 py-[18px] font-medium resize-none',
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
    <div className={cn('flex items-center justify-center pl-5', className)} {...props}>
      {children}
    </div>
  );
};

const TextFieldSuffix = ({ className, children, ...props }: TextFieldAdornmentProps) => {
  return (
    <div className={cn('flex items-center justify-center pr-5', className)} {...props}>
      {children}
    </div>
  );
};

const TextFieldLabel = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'label'>) => {
  const { required, textFieldId } = useTextFieldContext();

  return (
    <label
      htmlFor={textFieldId}
      className={cn('mb-5 flex items-center text-[20px] font-semibold', className)}
      {...props}
    >
      {children}
      {required && <span className='text-info-blue ml-1'>*</span>}
    </label>
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
      className={cn('text-error-red flex-1 text-sm font-medium', className)}
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
  maxGraphemeCount?: number;
  required?: boolean;
  error?: boolean;
  textFieldId: string;
  errorMessageId: string;
  errorMessageElement: HTMLParagraphElement | null;
  setErrorMessageElement: (element: HTMLParagraphElement | null) => void;
  format?: FormatOption;
};

const [TextFieldContext, useTextFieldContext] = createContext<TextFieldContextValue>('TextField');

const useRegisterTextField = () => {
  const {
    textFieldId,
    value,
    onChange,
    error,
    errorMessageElement,
    errorMessageId,
    maxGraphemeCount,
    format,
  } = useTextFieldContext();

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (format) {
      const formattedValue = formatter[format](event.target.value);
      return onChange(formattedValue);
    }

    if (maxGraphemeCount) {
      const slicedValue = event.target.value.slice(0, maxGraphemeCount);
      return onChange(slicedValue);
    }

    onChange(event.target.value);
  };

  const register = {
    id: textFieldId,
    value,
    onChange: onFieldChange,
    'aria-invalid': error || undefined,
    'data-invalid': error || undefined,
    'aria-describedby': cn(errorMessageElement && errorMessageId),
  };

  return { register };
};

export type FormatOption =
  | 'number'
  | 'phoneNumberDashed'
  | 'currency'
  | 'dateStringDotted'
  | 'dateStringDashed';

export const formatter: Record<FormatOption, (value: string) => string> = {
  number: (value) => numberOnly(value),
  phoneNumberDashed: (value) => formatAsPhoneNumberDashed(numberOnly(value)),
  currency: (value) => formatAsCurrency(numberOnly(value)),
  dateStringDotted: (value) => formatAsDateStringDotted(numberOnly(value)),
  dateStringDashed: (value) => formatAsDateStringDashed(numberOnly(value)),
};

const numberOnly = (value: string) => {
  return value.replace(/[^0-9]/g, '');
};

// 000-0000-0000
const formatAsPhoneNumberDashed = (value: string) => {
  if (value.length <= 3) return value;
  if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;

  return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
};

// YYYY-MM-DD
const formatAsDateStringDashed = (value: string) => {
  if (value.length <= 4) return value;
  if (value.length <= 6) return `${value.slice(0, 4)}-${value.slice(4)}`;

  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
};

// YYYY.MM.DD
const formatAsDateStringDotted = (value: string) => {
  if (value.length <= 4) return value;
  if (value.length <= 6) return `${value.slice(0, 4)}.${value.slice(4)}`;

  return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`;
};

// 1,000,000,000
const formatAsCurrency = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

TextField.Input = TextFieldInput;
TextField.Textarea = TextFieldTextarea;
TextField.Prefix = TextFieldPrefix;
TextField.Suffix = TextFieldSuffix;
TextField.Label = TextFieldLabel;
TextField.ErrorMessage = TextFieldErrorMessage;

export { TextField };
