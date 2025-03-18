import { cn } from 'lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'
import Text from './text'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, label, placeholder, errorMessage, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false)
    const [isFocused, setIsFocused] = React.useState<boolean>(false)
    const [value, setValue] = React.useState<string | number | readonly string[]>(props.value || '')

    React.useEffect(() => {
      setValue(props.value || '')
    }, [props.value])

    return (
      <div className='relative z-10'>
        <input
          type={isPasswordVisible ? 'text' : type}
          className={cn(
            'flex z-30 relative bg-transparent h-12 w-full rounded-md border border-light-20 focus:border-primary-10 duration-200 px-4 pt-4 pb-2 text-md text-dark placeholder:text-light-10 focus-visible:outline-none disabled:opacity-30',
            { 'pt-4': label },
            { 'pt-2': !label },
            { 'border-danger-10': errorMessage },
            className,
          )}
          placeholder={label ? undefined : placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={ref}
          {...props}
        />

        {type === 'password' && (
          <button
            type='button'
            className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-30'
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <EyeOffIcon className='w-4 h-4' />
            ) : (
              <EyeIcon className='w-4 h-4' />
            )}
          </button>
        )}

        {label && (
          <span
            className={cn(
              'absolute left-4 h-fit whitespace-nowrap z-20 transition-all duration-200 top-3.5',
              { '-translate-y-3.5': isFocused || value },
              { 'translate-y-0': !isFocused && !value },
            )}>
            <Text
              size={isFocused || value ? 'xs' : 'md'}
              weight='regular'
              color='text-light-10'
              className='duration-200'>
              {label}
            </Text>
          </span>
        )}
      </div>
    )
  },
)
InputField.displayName = 'Input'

const InputGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex flex-col gap-2'>{children}</div>
}

InputGroup.displayName = 'InputGroup'
const InputDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-sm text-muted-foreground'>{children}</p>
}

InputDescription.displayName = 'InputDescription'

export { InputDescription, InputField, InputGroup }
