import { ContactOptimization } from '@/components/sections/ContactOptimization'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Optimization',
  description: 'Get in touch to discuss infrastructure optimization and DevOps solutions',
}

export default function OptimizePage() {
  return (
    <div className="relative pt-16">
      <ContactOptimization />
    </div>
  )
}
