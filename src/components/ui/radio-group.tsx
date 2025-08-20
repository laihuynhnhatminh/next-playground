'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { ComponentProps } from 'react';

import { cn } from '@/libs/utils';

function RadioGroup({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'shrink-0 cursor-pointer bg-white text-primary outline-none transition-[color,border]',
        'aspect-square size-4 rounded-full border border-neutral-6',
        'aria-invalid:border-status-error',
        'focus-visible:border-primary-300',
        'data-[state=checked]:border-4 data-[state=checked]:border-primary-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
