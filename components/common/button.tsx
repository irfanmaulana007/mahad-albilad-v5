import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'lib/utils'
import * as React from 'react'

const buttonStyles = {
  base: [
    'inline-flex items-center justify-center whitespace-nowrap',
    'rounded-md text-sm font-medium',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  variants: {
    primary: {
      solid: 'bg-primary-10 text-light shadow hover:bg-primary',
      outline: 'border border-primary-10 text-primary-10 hover:bg-dark-0',
    },
    secondary: {
      solid: 'bg-dark text-light hover:bg-light-20',
      outline: 'border border-dark text-light hover:bg-light-20',
    },
    warning: {
      solid: 'bg-warning-10 text-dark-10 hover:bg-warning-0',
      outline: 'border border-warning-10 text-warning-10 hover:bg-dark-0',
    },
    danger: {
      solid: 'bg-danger-10 text-dark-10 hover:bg-danger-0',
      outline: 'border border-danger-10 text-danger-10 hover:bg-dark-0',
    },
    success: {
      solid: 'bg-success-10 text-dark-10 hover:bg-success-0',
      outline: 'border border-success-10 text-success-10 hover:bg-dark-0',
    },
    ghost: 'bg-transparent text-dark hover:text-dark-20',
    text: 'bg-transparent text-dark hover:text-dark-20',
  },
  sizes: {
    default: 'py-2 px-4 rounded-md',
    sm: 'py-1 px-2 rounded-md text-xs',
    lg: 'py-3 px-6 rounded-md',
    xs: 'py-1 px-2 text-xs rounded-md',
    compact: '',
  },
}

const buttonVariants = cva(buttonStyles.base, {
  variants: {
    variant: {
      primary: buttonStyles.variants.primary.solid,
      primaryOutline: buttonStyles.variants.primary.outline,
      secondary: buttonStyles.variants.secondary.solid,
      secondaryOutline: buttonStyles.variants.secondary.outline,
      warning: buttonStyles.variants.warning.solid,
      warningOutline: buttonStyles.variants.warning.outline,
      danger: buttonStyles.variants.danger.solid,
      dangerOutline: buttonStyles.variants.danger.outline,
      success: buttonStyles.variants.success.solid,
      successOutline: buttonStyles.variants.success.outline,
      ghost: buttonStyles.variants.ghost,
      text: buttonStyles.variants.text,
    },
    size: buttonStyles.sizes,
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  block?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const buttonClassName = cn(buttonVariants({ variant, size, className }), block && 'w-full')

    return <Comp ref={ref} type='button' className={buttonClassName} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
