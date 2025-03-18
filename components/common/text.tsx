import React from 'react'

interface TextProps {
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  weight?: 'regular' | 'medium' | 'bold'
  color?: string
  className?: string
}

const Text: React.FC<TextProps> = ({
  children,
  size = 'md',
  weight = 'regular',
  color = 'text-dark',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  }

  const weightClasses = {
    regular: 'font-regular',
    medium: 'font-medium',
    bold: 'font-bold',
  }

  const colorClasses = color

  return (
    <span
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses} ${className}`}
      style={{ color }}>
      {children}
    </span>
  )
}

Text.displayName = 'Text'

export default Text
