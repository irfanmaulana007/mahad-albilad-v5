import { Button } from 'components/common/button'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
// import { NotificationMenu } from './notification-menu'
import { UserMenu } from './user-menu'

interface TopNavProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function TopNav({ sidebarOpen, setSidebarOpen }: TopNavProps) {
  return (
    <header className='fixed top-0 z-50 w-full border-b bg-white'>
      <div className='flex h-16 items-center justify-between px-4'>
        <div className='flex items-center'>
          <Button
            variant='ghost'
            size='sm'
            className='hidden md:flex'
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <ChevronLeft className='h-4 w-4' />
            ) : (
              <ChevronRight className='h-4 w-4' />
            )}
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden'
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </Button>
          <h1 className='text-xl font-bold'>Admin Panel</h1>
        </div>
        <div className='flex items-center gap-4'>
          {/* <NotificationMenu /> */}
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
