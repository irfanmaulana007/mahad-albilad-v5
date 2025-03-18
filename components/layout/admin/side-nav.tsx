import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/common/tooltip'
import { cn } from 'lib/utils'
import { FileText, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const mainNavItems: NavItem[] = [
  // {
  //   title: 'Dashboard',
  //   href: '/admin/dashboard',
  //   icon: <LayoutDashboard className='h-4 w-4' />,
  // },
  {
    title: 'Users',
    href: '/admin/users',
    icon: <Users className='h-4 w-4' />,
  },
  {
    title: 'Articles',
    href: '/admin/articles',
    icon: <FileText className='h-4 w-4' />,
  },
]

// const settingsNavItem: NavItem = {
//   title: 'Setting',
//   href: '/admin/setting',
//   icon: <Settings className='h-4 w-4' />,
// }

interface SideNavProps {
  sidebarOpen: boolean
}

export function SideNav({ sidebarOpen }: SideNavProps) {
  const pathname = usePathname()

  const NavLink = ({ item }: { item: NavItem }) => {
    const linkClassName = cn(
      'flex items-center rounded-lg px-4 py-2 text font-medium transition-colors hover:bg-gray-100',
      pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900',
      !sidebarOpen && 'justify-center px-2',
    )

    if (sidebarOpen) {
      return (
        <Link href={item.href} className={linkClassName}>
          {item.icon}
          <span className='ml-3'>{item.title}</span>
        </Link>
      )
    }

    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Link href={item.href} className={linkClassName}>
              {item.icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right' align='start'>
            <p className='text-sm'>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <aside
      className={cn(
        'pt-16 z-40 h-screen fixed transform border-r bg-white transition-all duration-200 ease-in-out md:translate-x-0',
        !sidebarOpen && '-translate-x-full',
        sidebarOpen ? 'w-64' : 'w-16',
      )}>
      <nav className='relative flex h-full flex-col space-y-1 p-4'>
        <div className='flex-1 space-y-1'>
          {mainNavItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        {/* <div className='mb-10'>
          <NavLink item={settingsNavItem} />
        </div> */}
      </nav>
    </aside>
  )
}
