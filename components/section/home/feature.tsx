import { FEATURES } from 'constants/feature'

export default function FeatureSection() {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-semibold text-center mb-12'>Mengapa Memilih Kami</h2>
        <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-8'>
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center gap-y-3'>
              <div className='flex items-center justify-center h-[60px]'>{feature.icon}</div>
              <div className='flex flex-col gap-y-1'>
                <h3 className='text-xl font-semibold'>{feature.title}</h3>
                <p className='text-gray-600 text-sm'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
