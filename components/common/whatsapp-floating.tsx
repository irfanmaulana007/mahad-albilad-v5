import { WHATSAPP_NUMBER } from 'constants/information'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsappFloating() {
  return (
    <div className='fixed bottom-8 right-8 z-50'>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        className='flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Chat on WhatsApp'>
        <FaWhatsapp className='text-white text-3xl' />
      </a>
    </div>
  )
}
