'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href
    return `${
      isActive ? 'text-emerald-600 font-medium' : 'text-gray-600'
    } hover:text-emerald-600 transition-colors`
  }

  return (
    <nav className='bg-white shadow-md fixed w-full z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <Link href='/' className='flex items-center space-x-3'>
            <Image
              src='/images/logo.webp'
              alt='School Logo'
              width={40}
              height={40}
              className='w-auto h-10'
            />
            <span className='font-semibold text-lg text-gray-800'>Mahad Al-Bilad</span>
          </Link>

          <div className='hidden md:flex items-center space-x-8'>
            <Link href='/' className={getLinkClassName('/')}>
              Beranda
            </Link>
            <Link href='/about' className={getLinkClassName('/about')}>
              Tentang Kami
            </Link>
            <Link href='/articles' className={getLinkClassName('/articles')}>
              Artikel
            </Link>
            <Link
              href='/registration'
              className='bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors'>
              Daftar Sekarang
            </Link>
          </div>

          <button className='md:hidden p-2 rounded-md text-gray-600 hover:text-emerald-600 hover:bg-gray-100'>
            <svg
              className='h-6 w-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
