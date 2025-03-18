import Image from 'next/image'
import { Feature } from 'types/feature'

export const FEATURES: Feature[] = [
  {
    icon: <Image src='/images/icon/ijazah.webp' alt='Ijazah' width={60} height={60} />,
    title: 'Ijazah',
    description: 'Mendapatkan Ijazah SMA',
  },
  {
    icon: <Image src='/images/icon/sport.webp' alt='Lapangan Olahraga' width={60} height={60} />,
    title: 'Lapangan Olahraga',
    description: 'Futsal, Badminton, Panahan & Kolam Renang',
  },
  {
    icon: (
      <Image src='/images/icon/quality.webp' alt='Pengajar Berkualitas' width={60} height={60} />
    ),
    title: 'Pengajar Berkualitas',
    description: 'Lulusan LIPIA dan Madinah',
  },
  {
    icon: <p className='text-4xl font-bold'>4+1</p>,
    title: 'Program 4+1',
    description: 'Program pendidikan 4 tahun dan 1 tahun pengabdian',
  },
  {
    icon: (
      <Image src='/images/icon/education.webp' alt='Sanad Matan Jazari' width={60} height={60} />
    ),
    title: 'Sanad Matan Jazari*',
    description: 'Berkesempatan mendapatkan Sanad Matan Jazari',
  },
]
