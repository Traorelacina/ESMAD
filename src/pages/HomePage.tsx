import { motion } from 'framer-motion'
import { pageTransition } from '@/utils/animations'
import Hero from '@/components/home/Hero'
import EmergencyBanner from '@/components/ui/EmergencyBanner'
import ServicesSection from '@/components/home/ServicesSection'
import WhyUs from '@/components/home/WhyUs'
import ProcessSteps from '@/components/home/ProcessSteps'
import DoctorsPreview from '@/components/home/DoctorsPreview'
import Testimonials from '@/components/home/Testimonials'
import Partners from '@/components/home/Partners'
import NewsSection from '@/components/home/NewsSection'
import CtaBanner from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" exit="exit">
      <Hero />
      <EmergencyBanner />
      <ServicesSection />
      <WhyUs />
      <ProcessSteps />
      <DoctorsPreview />
      <Testimonials />
      <Partners />
      <NewsSection />
      <CtaBanner />
    </motion.div>
  )
}