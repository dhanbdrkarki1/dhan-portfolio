import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience as CI/CD pipeline executions and infrastructure evolution',
}

export default function DeployPage() {
  return (
    <div className="relative pt-16">
      <ExperienceTimeline />
    </div>
  )
}
