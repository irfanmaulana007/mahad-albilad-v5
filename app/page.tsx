'use client'

import WhatsappFloating from 'components/common/whatsapp-floating'
import Footer from 'components/layout/footer'
import Navigation from 'components/layout/navigation'
import AboutSection from 'components/section/home/about'
import ArticleSection from 'components/section/home/article'
import FeatureSection from 'components/section/home/feature'
import HeroSection from 'components/section/home/hero'
import RegistrationSection from 'components/section/home/registration'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Navigation />
      <WhatsappFloating />

      <HeroSection />
      <AboutSection />
      <FeatureSection />
      <RegistrationSection />
      <ArticleSection />

      <Footer />
    </main>
  )
}
