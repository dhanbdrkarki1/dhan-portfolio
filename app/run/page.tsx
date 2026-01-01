import { ProjectsInProduction } from '@/components/sections/ProjectsInProduction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production-grade projects and infrastructure I have built',
}

export default function RunPage() {
  return (
    <div className="relative pt-16">
      <ProjectsInProduction />
    </div>
  )
}
