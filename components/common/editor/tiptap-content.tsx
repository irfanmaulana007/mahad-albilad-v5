import { cn } from 'lib/utils'

interface TiptapContentProps {
  content: string
  className?: string
}

export function TiptapContent({ content, className }: TiptapContentProps) {
  return (
    <div
      className={cn('prose max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
