import { Button } from 'components/common/button'
import { LogOut, Settings, User, UserCircle } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'

export function UserMenu() {
  const router = useRouter()
  const { data: session } = useSession()

  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useClickOutside(userMenuRef, () => {
    setShowUserMenu(false)
  })

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/auth/login')
  }

  return (
    <div className='relative' ref={userMenuRef}>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setShowUserMenu(!showUserMenu)}
        className='relative'>
        <User className='h-5 w-5' />
      </Button>

      {showUserMenu && (
        <div className='absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-lg'>
          <div className='p-2'>
            <div className='px-4 py-3 border-b'>
              <p className='text font-medium'>{session?.user?.name || 'User'}</p>
              <p className='text-sm text-gray-500 truncate'>{session?.user?.email}</p>
            </div>
            <div className='py-2'>
              <button
                className='w-full px-4 py-2 text text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-md'
                onClick={() => {
                  router.push('/admin/profile')
                  setShowUserMenu(false)
                }}>
                <UserCircle className='h-4 w-4' />
                Profile
              </button>
              <button
                className='w-full px-4 py-2 text text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-md'
                onClick={() => {
                  router.push('/admin/setting')
                  setShowUserMenu(false)
                }}>
                <Settings className='h-4 w-4' />
                Settings
              </button>
              <button
                className='w-full px-4 py-2 text text-left text-red-600 hover:bg-gray-100 flex items-center gap-2 rounded-md'
                onClick={handleLogout}>
                <LogOut className='h-4 w-4' />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
