import type { ComponentProps } from 'react';

import { cn } from '@/libs/utils';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'typography-small-normal flex h-11 w-full min-w-0 bg-white px-4 py-3.5 text-neutral-1',
        'rounded-3xl border border-neutral-7 outline-none transition-[color,box-shadow]',
        'placeholder:text-neutral-4',
        'disabled:typography-small-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-4',
        'selection:bg-primary selection:text-primary-foreground',
        'file:typography-small-semibold file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-foreground',
        'focus-visible:border-primary-300',
        'aria-invalid:border-status-error aria-invalid:text-status-error',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
