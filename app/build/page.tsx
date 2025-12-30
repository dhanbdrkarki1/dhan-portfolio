import { SkillsInfrastructure } from '@/components/sections/SkillsInfrastructure'

export default function BuildPage() {
  return (
    <div className="relative pt-16">
      <SkillsInfrastructure />
    </div>
  )
}

export const metadata = {
  title: 'Skills & Infrastructure | DevOps Portfolio',
  description: 'Technical skills visualized as cloud infrastructure and service dependencies',
}
