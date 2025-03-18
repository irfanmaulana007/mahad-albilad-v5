import { cn } from 'lib/utils'
import { TableCell, TableRow } from './table'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} {...props} />
}

export function SkeletonRow() {
  return (
    <div className='space-y-3'>
      <Skeleton className='h-4 w-[250px]' />
      <Skeleton className='h-10 w-full' />
    </div>
  )
}

export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div className='rounded-lg border bg-white p-6 space-y-6'>
      <Skeleton className='h-7 w-[200px]' />
      <div className='space-y-5'>
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
      <Skeleton className='h-10 w-[120px]' />
    </div>
  )
}

export function SkeletonTable({ rows = 3, columns = 3 }: { rows?: number; columns?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i}>
          {Array.from({ length: columns }).map((_, j) => (
            <TableCell key={j}>
              <Skeleton className='h-4 w-full' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
