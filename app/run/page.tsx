import { ProjectsInProduction } from '@/components/sections/ProjectsInProduction'

export default function RunPage() {
  return (
    <div className="relative pt-16">
      <ProjectsInProduction />
    </div>
  )
}

export const metadata = {
  title: 'Projects in Production | DevOps Portfolio',
  description: 'Production projects and infrastructure systems running at scale',
}
