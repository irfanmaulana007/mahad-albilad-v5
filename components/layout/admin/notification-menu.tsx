import { Button } from 'components/common/button'
import { Bell } from 'lucide-react'
import { useRef, useState } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export function NotificationMenu() {
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  useClickOutside(notificationRef, () => {
    setShowNotifications(false)
  })

  // Dummy notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New User Registration',
      message: 'John Doe has registered as a new user',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      title: 'System Update',
      message: 'System maintenance scheduled for tomorrow',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'New Order',
      message: 'New order #1234 has been placed',
      time: '2 hours ago',
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className='relative' ref={notificationRef}>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setShowNotifications(!showNotifications)}
        className='relative'>
        <Bell className='h-5 w-5' />
        {unreadCount > 0 && (
          <span className='absolute top-0 right-1 h-2 w-2 rounded-full bg-red-500' />
        )}
      </Button>

      {showNotifications && (
        <div className='absolute right-0 mt-2 w-80 rounded-md border bg-white shadow-lg'>
          <div className='p-4'>
            <h3 className='text-lg font-semibold mb-2'>Notifications</h3>
            <div className='space-y-3'>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                  <h4 className='font-medium'>{notification.title}</h4>
                  <p className='text-sm text-gray-600'>{notification.message}</p>
                  <span className='text-xs text-gray-400'>{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
