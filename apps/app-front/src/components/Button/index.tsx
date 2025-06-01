type ButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'press' | 'disabled' | 'secondary';
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const sizeStyles = {
  sm: 'w-[300px] h-[80px] text-[32px]',
  md: 'w-[400px] h-[85px] text-[32px]',
  lg: 'w-[640px] h-[100px] text-[32px]',
};

const variantStyles = {
  default: 'bg-primary-pink text-white',
  press: 'bg-[#cc202f] text-white',
  disabled: 'bg-[#f1f3f5] text-[#999999] cursor-not-allowed',
  secondary: 'bg-white text-primary-pink border border-primary-pink',
};

export default function Button({
  size = 'md',
  variant = 'default',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
          rounded-full font-bold
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${className}
        `}
      disabled={variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
}
