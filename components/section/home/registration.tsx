import Link from 'next/link'

export default function RegistrationSection() {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-semibold text-center mb-8'>Pendaftaran Murid Baru</h2>
        <div className='max-w-4xl mx-auto text-gray-600 space-y-4 mb-8'>
          <p>
            Mahad Al-Bilad juga memberikan kesempatan untuk santri dalam mempelajari islami lebih
            dalam dengan membuka penerimaan Santri Baru (Full Beasiswa) Program Kaderisasi Da&apos;i
            dan Hafidz untuk Tahun Akademik 2021/2022 (*khusus putra).
          </p>
        </div>
        <div className='text-center'>
          <Link
            href='/registration'
            className='bg-emerald-600 border-2 border-emerald-600 hover:border-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors'>
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </section>
  )
}
