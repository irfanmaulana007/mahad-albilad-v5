import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className='flex items-center space-x-2 text-sm text-gray-500 mb-4'>
      {items.map((item, index) => (
        <div key={item.label} className='flex items-center'>
          {index > 0 && <ChevronRight className='h-4 w-4 mx-2' />}
          {item.href ? (
            <Link
              href={item.href}
              className='hover:text-primary-10 transition-colors flex items-center gap-x-2'>
              {index === 0 && <ChevronLeft className='h-4 w-4' />}

              {item.label}
            </Link>
          ) : (
            <span className='text-gray-900 font-medium'>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
