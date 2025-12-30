import { ObservabilityDashboard } from '@/components/sections/ObservabilityDashboard'

export default function ObservePage() {
  return (
    <div className="relative pt-16">
      <ObservabilityDashboard />
    </div>
  )
}

export const metadata = {
  title: 'Knowledge & Insights | DevOps Portfolio',
  description: 'Technical articles, architecture decisions, and DevOps best practices',
}
