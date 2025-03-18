import { EMAIL, WHATSAPP_NUMBER } from 'constants/information'
import { format } from 'date-fns'
import { Mail } from 'lucide-react'

import Link from 'next/link'
import { FaFacebook, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='bg-primary text-white'>
      <div className='container mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-3 gap-20'>
          <div className='space-y-4'>
            <h3 className='text-lg font-bold mb-4'>TENTANG KAMI</h3>
            <p className='text-sm text-gray-light'>
              MA&apos;HAD AL-BILAD LI-I&apos;DADI AD-DU&apos;AT WA AL-HUFFADZ Al-Bilad Islamic
              Boarding School didirikan oleh DKM Al Bilad perumahan Taman Kenari Nusantara Cibubur.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>INFORMASI</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='/' className='text-gray-light hover:text-white transition-colors'>
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href='/registration'
                  className='text-gray-light hover:text-white transition-colors'>
                  Pendaftaran
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-gray-light hover:text-white transition-colors'>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href='/articles'
                  className='text-gray-light hover:text-white transition-colors'>
                  Artikel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-bold mb-4'>KONTAK</h3>
            <div className='flex flex-col space-y-4 text-sm'>
              <a
                href='https://www.facebook.com/mahad.albilad/'
                target='_blank'
                className='text-gray-light hover:text-white transition-colors flex items-center gap-2'>
                <FaFacebook className='w-4 h-4' />
                Al-Bilad Islamic Boarding School
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target='_blank'
                className='text-gray-light hover:text-white transition-colors flex items-center gap-2'>
                <FaWhatsapp className='w-4 h-4' />
                +62 8532 5434 248 (Ustadz Kholid Mirbah, Lc*)
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className='text-gray-light hover:text-white transition-colors flex items-center gap-2'>
                <Mail className='w-4 h-4' />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-400 mt-12 pt-8 text-center text-gray-light'>
          <div className='flex items-center justify-between'>
            <p className='text-sm'>Ma&apos;had Al Bilad Li I&apos;dadi Ad-Du&apos;at Walhuffadz</p>
            <p className='text-sm'>
              &copy; {format(new Date(), 'yyyy')} Islamic School. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
