import { Hero } from '@/components/sections/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dhan | DevOps Engineer',
  description: 'DevOps Engineer from Kathmandu, Nepal specializing in cloud infrastructure, Docker, Terraform, and CI/CD automation. Building scalable and efficient systems.',
}

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
    </div>
  )
}
