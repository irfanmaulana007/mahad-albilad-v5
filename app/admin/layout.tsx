'use client'

import { SideNav } from 'components/layout/admin/side-nav'
import { TopNav } from 'components/layout/admin/top-nav'
import { cn } from 'lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { status } = useSession()
  const router = useRouter()
  useUser()

  useEffect(() => {
    // If session status is "unauthenticated", redirect to login
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  // If loading or unauthenticated, don't render the layout
  if (status === 'loading' || status === 'unauthenticated') {
    return null
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <SideNav sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main
        className={cn('min-h-[calc(100vh-4rem)] transition-all duration-200 ease-in-out', {
          'md:pl-64': sidebarOpen,
          'md:pl-16': !sidebarOpen,
        })}>
        {sidebarOpen && (
          <div
            className='absolute inset-0 bg-black/20 transition-all duration-200 ease-in-out md:hidden'
            onClick={() => setSidebarOpen(false)}></div>
        )}
        <div className='container mx-auto p-4 pt-20'>{children}</div>
      </main>
    </div>
  )
}
