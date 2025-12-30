'use client'

import { motion } from 'framer-motion'
import { TerminalLogger } from '@/components/ui/TerminalLogger'
import { CheckCircle2, TrendingDown, TrendingUp, Zap, Shield } from 'lucide-react'
import { useState } from 'react'

interface Experience {
  id: string
  role: string
  company: string
  period: string
  location: string
  type: 'feature' | 'optimization' | 'migration' | 'security'
  achievements: Array<{
    text: string
    metric?: string
    icon: any
  }>
  technologies: string[]
  commitHash: string
}

const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'DevOps Engineer',
    company: 'Cloud Tech Solutions',
    period: '2023 - Present',
    location: 'Remote',
    type: 'optimization',
    commitHash: 'a3f7d2e',
    technologies: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana'],
    achievements: [
      {
        text: 'Reduced AWS infrastructure costs by 50-60% (dev) and 30% (prod) through right-sizing and Reserved Instances',
        metric: '50% cost ↓',
        icon: TrendingDown,
      },
      {
        text: 'Reduced CI/CD build time from 45 minutes to 4 minutes (90% improvement)',
        metric: '90% faster',
        icon: Zap,
      },
      {
        text: 'Achieved 99.9% SLA uptime with zero-downtime deployments',
        metric: '99.9% SLA',
        icon: TrendingUp,
      },
      {
        text: 'Improved Mean Time to Recovery (MTTR) by 40% using enhanced monitoring',
        metric: '40% MTTR ↓',
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: 'exp-2',
    role: 'Cloud DevOps Engineer',
    company: 'Infrastructure Inc',
    period: '2021 - 2023',
    location: 'Hybrid',
    type: 'migration',
    commitHash: 'b8e4c91',
    technologies: ['Azure', 'AWS', 'Docker', 'Terraform', 'Jenkins', 'New Relic'],
    achievements: [
      {
        text: 'Led cross-cloud migration from AWS to Azure with zero downtime',
        metric: 'Zero downtime',
        icon: CheckCircle2,
      },
      {
        text: 'Architected highly available infrastructure (VPC, ALB, ASG, ECS, EKS, RDS)',
        metric: 'Multi-AZ HA',
        icon: Shield,
      },
      {
        text: 'Implemented Blue/Green deployment strategies for critical applications',
        metric: 'Safe deploys',
        icon: Zap,
      },
      {
        text: 'Reduced deployment frequency from weekly to multiple times per day',
        metric: 'Daily deploys',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 'exp-3',
    role: 'Junior DevOps Engineer',
    company: 'Startup Systems',
    period: '2020 - 2021',
    location: 'On-site',
    type: 'feature',
    commitHash: 'c1d9f3a',
    technologies: ['AWS', 'Docker', 'GitHub Actions', 'CloudFormation', 'CloudWatch'],
    achievements: [
      {
        text: 'Built CI/CD pipelines for Next.js, React, Node.js, and Spring Boot applications',
        metric: '15+ pipelines',
        icon: CheckCircle2,
      },
      {
        text: 'Automated infrastructure provisioning using Terraform and CloudFormation',
        metric: 'IaC adoption',
        icon: Zap,
      },
      {
        text: 'Implemented comprehensive monitoring with Prometheus and Grafana',
        metric: 'Full observability',
        icon: TrendingUp,
      },
      {
        text: 'Established security scanning in pipelines (tfsec, Checkov, Trivy)',
        metric: 'Zero vulns',
        icon: Shield,
      },
    ],
  },
]

const typeColors = {
  feature: 'text-neon-cyan border-neon-cyan',
  optimization: 'text-neon-green border-neon-green',
  migration: 'text-neon-purple border-neon-purple',
  security: 'text-status-error border-status-error',
}

const typeLabels = {
  feature: 'feat',
  optimization: 'perf',
  migration: 'refactor',
  security: 'security',
}

export function ExperienceTimeline() {
  const [selectedExp, setSelectedExp] = useState<string>(experiences[0].id)

  const terminalLines = experiences
    .find(e => e.id === selectedExp)
    ?.achievements.map((achievement, idx) => ({
      id: `log-${idx}`,
      text: achievement.text,
      type: 'success' as const,
    })) || []

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="glow-text">Deployment</span> History
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional experience as CI/CD pipeline executions and infrastructure evolution
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedExp(exp.id)}
                className={`card-devops cursor-pointer transition-all duration-300 ${
                  selectedExp === exp.id
                    ? 'border-neon-cyan scale-105'
                    : 'hover:border-gray-500'
                }`}
              >
                {/* Commit Header */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-devops-border">
                  <span className={`px-2 py-1 rounded text-xs font-mono ${typeColors[exp.type]} border`}>
                    {typeLabels[exp.type]}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {exp.commitHash}
                  </span>
                </div>

                {/* Role & Company */}
                <h3 className="font-bold text-lg mb-1">{exp.role}</h3>
                <p className="text-neon-cyan text-sm mb-2">{exp.company}</p>
                
                {/* Period & Location */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>

                {/* Achievement Count */}
                <div className="mt-3 pt-3 border-t border-devops-border">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3 h-3 text-neon-green" />
                    <span>{exp.achievements.length} key achievements</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-2 space-y-6">
            {experiences
              .filter(exp => exp.id === selectedExp)
              .map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Commit Details */}
                  <div className="card-devops mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{exp.role}</h2>
                        <p className="text-xl text-neon-cyan mb-1">{exp.company}</p>
                        <p className="text-gray-400">{exp.period} · {exp.location}</p>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-lg border ${typeColors[exp.type]}`}>
                        <span className="font-mono text-sm uppercase">
                          {typeLabels[exp.type]}:{exp.commitHash}
                        </span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mt-4 pt-4 border-t border-devops-border">
                      <h3 className="text-sm text-gray-400 uppercase mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-devops-bg border border-neon-cyan border-opacity-30 rounded-lg text-sm text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievements as Metrics */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {exp.achievements.map((achievement, idx) => {
                      const Icon = achievement.icon
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="card-devops"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm text-gray-300 mb-2">
                                {achievement.text}
                              </p>
                              {achievement.metric && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan bg-opacity-10 rounded-full border border-neon-cyan border-opacity-30">
                                  <span className="text-xs font-mono text-neon-cyan font-bold">
                                    {achievement.metric}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Terminal Log View */}
                  <TerminalLogger lines={terminalLines} />
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
