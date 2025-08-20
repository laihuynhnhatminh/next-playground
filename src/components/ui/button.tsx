import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/libs/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 typography-base-semibold whitespace-nowrap rounded-button cursor-pointer transition-all disabled:pointer-events-none [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 text-white hover:outline-primary-900 hover:outline-solid hover:outline hover:bg-white hover:text-primary-500 focus-visible:bg-white focus-visible:text-primary-500 focus-visible:text-primary-500 focus-visible:outline-primary-900 focus-visible:outline-solid focus-visible:outline disabled:bg-neutral-6 disabled:text-neutral-4',
        classic:
          'bg-neutral-9 text-neutral-1 hover:outline-neutral-9 hover:outline-solid hover:outline hover:bg-neutral-1 hover:text-white',
        outline:
          'border-primary-500 text-primary-500 hover:border-primary-300 hover:text-primary-300 focus-visible:border-primary-700 focus-visible:text-primary-700 disabled:border-neutral-6 disabled:text-neutral-6 border',
        ghost:
          'text-primary-500 hover:text-primary-700 focus-visible:text-primary-300 disabled:text-neutral-6',
        filled:
          'bg-primary-500 hover:bg-primary-300 focus-visible:bg-primary-700 disabled:bg-neutral-6 disabled:text-neutral-4 text-white',
        'icon-only':
          'text-neutral-1 hover:text-neutral-4 focus-visible:text-neutral-black disabled:text-neutral-6',
        'icon-filled':
          'text-primary-500 bg-primary-100 hover:bg-primary-300 focus-visible:bg-primary-700 disabled:text-neutral-4 disabled:bg-neutral-6 hover:text-white focus-visible:text-white',
        transparent: 'bg-transparent',
        input:
          'border-neutral-7 w-full rounded-3xl bg-white border typography-small-semibold justify-start',
      },
      size: {
        default: 'h-9 px-4 py-2',
        small: 'h-7 px-3 py-1.5 typography-small-normal',
        large: 'h-11 px-4 py-2.5',
        'icon-small': 'size-6',
        'icon-normal': 'size-10',
        'icon-large': 'size-11',
        auto: 'size-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/**
 * Button properties interface.
 * name: string - The name of the button, used for accessibility and testing. (Mostly SEO purposes)
 * type: "button" | "submit" | "reset" - The type of the button, defaults to "button" to avoid submit.
 */
interface IButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  name: string;
  asChild?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  iconLeft,
  iconRight,
  children,
  type = 'button',
  ...props
}: IButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      {...props}
    >
      {iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { IButtonProps };
