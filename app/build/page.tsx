import { SkillsInfrastructure } from '@/components/sections/SkillsInfrastructure'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills visualized as cloud infrastructure and service dependencies',
}

export default function BuildPage() {
  return (
    <div className="relative pt-16">
      <SkillsInfrastructure />
    </div>
  )
}
