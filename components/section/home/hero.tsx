import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className='relative h-screen flex items-center justify-center'>
      <div
        className='absolute inset-0 z-0 bg-fixed bg-cover bg-bottom brightness-[0.25]'
        style={{
          backgroundImage: 'url("/images/bg1.webp")',
        }}
      />
      <div className='relative z-10 text-center text-white px-4 flex flex-col items-center justify-center gap-y-6'>
        <Image
          src='/images/intro.webp'
          alt='School Logo'
          width={360}
          height={120}
          className='mx-auto'
        />
        <h1 className='text-2xl font-semibold'>Al-Bilad Islamic Boarding School</h1>
        <div className='flex flex-col gap-y-2'>
          <p className='font-medium'>
            Mencetak Generasi Qur&apos;ani, Berkafaah ilmu Syar&apos;I serta mempunyai semangat
            dakwah yang tinggi.
          </p>
          <p className='text-sm text-gray-300'>
            Masjid Al Bilad Taman Kenari Nusantara, Nagrak, Kec. Gn. Putri, Bogor, Jawa Barat 16967
          </p>
        </div>
        <Link
          href='/registration'
          className='bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors'>
          Daftar Sekarang
        </Link>
      </div>
    </section>
  )
}
