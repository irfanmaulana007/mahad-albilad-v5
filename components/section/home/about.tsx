import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-semibold text-center mb-8'>Tentang Kami</h2>
        <div className='max-w-4xl mx-auto text-gray-600 space-y-4 mb-8'>
          <p className='indent-8'>
            MA&apos;HAD AL-BILAD LI-I&apos;DADI AD-DU&apos;AT WA AL-HUFFADZ Al-Bilad Islamic
            Boarding School didirikan oleh DKM Al Bilad perumahan Taman Kenari Nusantara Cibubur.
          </p>
          <p className='indent-8'>
            Dalam bidang pendidikan, dimulai pada tahun 2005 dengan mendirikan Taman Pendidikan
            Al-Qur&apos;an (TPA) kemudian PG/TK Tahfidz Al Qur&apos;an pada tahun 2012. Insyaa Allah
            tahun 2021 ini beroperasi Ma&apos;had untuk tingkat SMA / yang sederajat.
          </p>
          <p className='indent-8'>
            Peserta didik diambil dari lulusan SMP atau sederajat dari seluruh Indonesia yang
            berprestasi, berkemampuan dan berkemauan menghapal Al Qur&apos;an dan mempelajari ilmu
            matan syar&apos;i lainnya namun kurang mampu.
          </p>
          <p className='indent-8'>
            Pendidikan di Ma&apos;had gratis. Disediakan asrama dan tempat belajar, para pengajar S1
            & S2 LIPIA dan alumni Timur Tengah. Selulus dari Ma&apos;had, para peserta diharapkan
            bisa kembali ke daerah dan mengabdikan ilmunya ke lingkungannya. Multiplayer efek
            kebaikan itulah harapannya. &quot;Keberkahan itu adalah bertambah dan bertambahnya
            kebaikan&quot;.
          </p>
        </div>
        <div className='text-center'>
          <Link
            href='/about'
            className='inline-block border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-2 rounded-full transition-colors'>
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </section>
  )
}
