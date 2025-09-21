'use client';

import { DropdownMenu as DropdownMenuPrimitives } from 'radix-ui';
import { tv, VariantProps } from 'tailwind-variants';

import { cn } from '../../utils';

type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitives.Root>;

const DropdownMenu = ({ children, ...props }: DropdownMenuProps) => {
  return <DropdownMenuPrimitives.Root {...props}>{children}</DropdownMenuPrimitives.Root>;
};

type DropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitives.Content>;

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  children,
  ...props
}: DropdownMenuContentProps) => {
  return (
    <DropdownMenuPrimitives.Portal>
      <DropdownMenuPrimitives.Content
        className={cn(
          'min-w-[110px] flex flex-col py-3 bg-white rounded-[8px] outline-hidden',
          'shadow-[0_1px_6px_0_rgba(0,0,0,0.1),0_0_2px_0_rgba(0,0,0,0.06),0_0_3px_0_rgba(0,0,0,0.1)]',
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
      </DropdownMenuPrimitives.Content>
    </DropdownMenuPrimitives.Portal>
  );
};

const dropdownMenuItemVariants = tv({
  base: cn(
    'outline-hidden cursor-pointer h-[30px] flex px-4 items-center font-medium',
    'focus:bg-gray-7',
  ),
  variants: {
    variant: {
      default: '',
      danger: 'text-error-red',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitives.Item> &
  VariantProps<typeof dropdownMenuItemVariants>;

const DropdownMenuItem = ({ className, variant, children, ...props }: DropdownMenuItemProps) => {
  return (
    <DropdownMenuPrimitives.Item
      className={cn(dropdownMenuItemVariants({ variant }), className)}
      {...props}
    >
      {children}
    </DropdownMenuPrimitives.Item>
  );
};

DropdownMenu.Trigger = DropdownMenuPrimitives.Trigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;

export { DropdownMenu };
