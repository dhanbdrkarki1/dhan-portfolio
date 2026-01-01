import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'My professional journey in DevOps and cloud infrastructure',
}

export default function DeployPage() {
  return (
    <div className="relative pt-16">
      <ExperienceTimeline />
    </div>
  )
}
