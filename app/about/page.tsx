import { Mail, MapPinIcon, PhoneIcon } from 'lucide-react'
import Image from 'next/image'

import WhatsappFloating from 'components/common/whatsapp-floating'
import Footer from 'components/layout/footer'
import Navigation from 'components/layout/navigation'

export default function AboutPage() {
  return (
    <main className='min-h-screen'>
      <Navigation />
      <WhatsappFloating />

      <br />

      {/* Hero Section */}
      <section className='bg-white py-16 container mx-auto px-4'>
        <div className='container mx-auto px-4 flex flex-col items-center justify-center gap-y-4'>
          <Image
            src='/images/logo.webp'
            alt='School Logo'
            width={200}
            height={200}
            className='mx-auto'
          />
          <div className='flex flex-col items-center justify-center gap-y-1'>
            <h1 className='text-3xl font-semibold text-center text-emerald-800'>
              MA&apos;HAD AL-BILAD LI-I&apos;DADI AD-DU&apos;AT WA AL-HUFFADZ
            </h1>
            <p className='text-center text-2xl font-medium text-gray-600 max-w-2xl mx-auto'>
              Al-Bilad Islamic Boarding School
            </p>
          </div>
          <p className='text-lg text-gray-600 indent-20'>
            Indonesia adalah negara dengan penduduk mayoritas muslim terbesar di dunia, ini
            merupakan kebahagiaan yang tidak dapat dinilai dengan apapun, ini adalah karunia dari
            Allah swt yang harus dijaga dan dipertahankan dengan baik agar nikmat ini akan terus
            dirasakan sepanjang zaman. Sudah menjadi lumrah bila jumlah mayoritas tidaklah menjamin
            kualitas, jumlah yang banyak terkadang membuat masyarakatnya tenggelam dalam kelalaian.
            Kondisi seperti ini sangat rentan karena lambat laun jumlah yang banyak ini akan melemah
            tidak berkualitas dan mudah sekali digerogoti oleh hal-hal negative baik dari dalam atau
            dari luar.
          </p>
          <p className='text-lg text-gray-600 indent-20'>
            Pengaruh terbesar yang membuat masyarakat lemah adalah lemahnya pemahaman mereka
            terhadap islam dan komitmen mereka kepada agamanya. Kebodohan ummat terhadap agamanya
            adalah sumber utama segala kemaksiatan dan malapetaka. Maka kebutuhan ummat yang sangat
            mendesak sekarang ini adalah memperbaiki cara berfikir dan komitmen mereka terhadap
            agama. Namun untuk itu dibutuhkan banyak sekali tenaga yang berkomitmen kuat untuk
            mengusung visi mulia ini. Dan itu butuh program khusus untuk membidani keagamaan mereka.
            Mereka adalah generasi yang di program, didesain, dipersiapkan, dirawat dan
            didedikasikan memang untuk mengabdi kepada agama dan umat. Mereka itulah para da&apos;I,
            para pejuang di jalan Allah yang dibekali keilmuan yang memadai untuk secara sadar diri
            mengabdi kepada agama umat sebagai jalan hidup. Kebutuhan kepada para dai yang seperti
            ini, yang siap mengajar dan menyampaikan ilmu syar&apos;i (Ilmu Agama) kepada
            masyarakat, dai yang siap berkorban dan mengabdikan dirinya pada Allah dan Rasulnya
            dalam membina ummatnya adalah kebutuhan yang sangat-sangat tinggi dan kebutuhan mendesak
            umat ini. Lebih-lebih di era digital yang mana kerusakan remaja kian hari kian
            mencemaskan.
          </p>
          <p className='text-lg text-gray-600 indent-20'>
            MA&apos;HAD AL-BILAD LI-I&apos;DADI AD-DU&apos;AT WA AL-HUFFADZ Al-Bilad Islamic
            Boarding School didirikan oleh DKM Al Bilad perumahan Taman Kenari Nusantara Cibubur.
          </p>
          <p className='text-lg text-gray-600 indent-20'>
            Dalam bidang pendidikan, dimulai pada tahun 2005 dengan mendirikan Taman Pendidikan
            Al-Qur&apos;an (TPA) kemudian PG/TK Tahfidz Al Qur&apos;an pada tahun 2012. Insyaa Allah
            tahun 2021 ini beroperasi Ma&apos;had untuk tingkat SMA / yang sederajat.
          </p>
          <p>
            Peserta didik diambil dari lulusan SMP atau sederajat dari seluruh Indonesia yang
            berprestasi, berkemampuan dan berkemauan menghapal Al Qur&apos;an dan mempelajari ilmu
            matan syar&apos;i lainnya namun kurang mampu.
          </p>
          <p>
            Pendidikan di Ma&apos;had gratis. Disediakan asrama dan tempat belajar, para pengajar S1
            & S2 LIPIA dan alumni Timur Tengah. Selulus dari Ma&apos;had, para peserta diharapkan
            bisa kembali ke daerah dan mengabdikan ilmunya ke lingkungannya. Multiplayer efek
            kebaikan itulah harapannya. &quot;Keberkahan itu adalah bertambah dan bertambahnya
            kebaikan&quot;. harapannya. &quot;Keberkahan itu adalah bertambah dan bertambahnya
            kebaikan&quot;.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className='bg-emerald-50 py-24'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-semibold mb-6 text-emerald-700 text-center'>
            Visi dan Misi
          </h2>
          <div className='grid md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
            {/* Vision Card */}
            <div className='bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1'>
              <div className='text-center mb-6'>
                <span className='inline-block p-3 bg-emerald-100 rounded-full mb-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 text-emerald-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                </span>
                <h3 className='text-3xl font-bold mb-4 text-emerald-800'>Visi</h3>
              </div>
              <p className='text-gray-700 text-lg text-center leading-relaxed'>
                Mencetak Generasi Qur&apos;ani, Berkafaah ilmu Syar&apos;I serta mempunyai semangat
                dakwah yang tinggi.
              </p>
            </div>

            {/* Mission Card */}
            <div className='bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1'>
              <div className='text-center mb-6'>
                <span className='inline-block p-3 bg-emerald-100 rounded-full mb-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-8 w-8 text-emerald-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                    />
                  </svg>
                </span>
                <h3 className='text-3xl font-bold mb-4 text-emerald-800'>Misi</h3>
              </div>
              <ul className='space-y-2'>
                <li className='flex items-start'>
                  <span className='text-emerald-500 mr-2'>•</span>
                  <p className='text-gray-700'>Mencetak generasi muda yang hafidz Qur&apos;an</p>
                </li>
                <li className='flex items-start'>
                  <span className='text-emerald-500 mr-2'>•</span>
                  <p className='text-gray-700'>
                    Mencetak kader-kader dakwah dan pendidik yang berkualitas dan berakhlakul
                    karimah
                  </p>
                </li>
                <li className='flex items-start'>
                  <span className='text-emerald-500 mr-2'>•</span>
                  <p className='text-gray-700'>
                    Mengokohkan tradisi menghafalkan mutun ilmiyah sebagai dasar dari kurikulum
                    islam klasik
                  </p>
                </li>
                <li className='flex items-start'>
                  <span className='text-emerald-500 mr-2'>•</span>
                  <p className='text-gray-700'>Melatih kemandirian santri dalam berwirausaha</p>
                </li>
                <li className='flex items-start'>
                  <span className='text-emerald-500 mr-2'>•</span>
                  <p className='text-gray-700'>
                    Membentuk pribadi yang mempunyai kepedulian tinggi terhadap dakwah dan urusan
                    umat
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className='py-16 container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-semibold mb-6 text-emerald-700 text-center'>Lokasi</h2>
          <div className='aspect-w-16 aspect-h-9 mb-8'>
            <iframe
              src='https://www.google.com/maps/embed?pb=YOUR_EMBED_URL_HERE'
              width='100%'
              height='450'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              className='rounded-lg shadow-md'></iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='bg-emerald-50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-semibold mb-6 text-emerald-700 text-center'>
              Hubungi kami
            </h2>
            <div className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <MapPinIcon className='text-emerald-600 h-6 w-6 mt-1' />
                <div>
                  <h4 className='font-semibold text-gray-800'>Alamat</h4>
                  <p className='text-gray-600'>
                    Masjid Al Bilad Taman Kenari Nusantara, Nagrak, Kec. Gn. Putri, Bogor, Jawa
                    Barat 16967
                  </p>
                </div>
              </div>
              <a href='https://wa.me/6285325434248' target='_blank' className='block'>
                <div className='flex items-start space-x-4'>
                  <PhoneIcon className='text-emerald-600 h-6 w-6 mt-1' />
                  <div>
                    <h4 className='font-semibold text-gray-800'>Telepon</h4>
                    <p className='text-gray-600'>+62 8532 5434 248 (Ustadz Kholid Mirbah, Lc*)</p>
                  </div>
                </div>
              </a>
              <a href='mailto:khalid@mahad-albilad.or.id' target='_blank' className='block'>
                <div className='flex items-start space-x-4'>
                  <Mail className='text-emerald-600 h-6 w-6 mt-1' />
                  <div>
                    <h4 className='font-semibold text-gray-800'>Email</h4>
                    <p className='text-gray-600'>khalid@mahad-albilad.or.id</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
