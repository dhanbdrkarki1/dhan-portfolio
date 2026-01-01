'use client'

import { motion } from 'framer-motion'
import { TerminalLogger } from '@/components/ui/TerminalLogger'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { resumeData } from '@/data/resume'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const experiences = resumeData.experiences

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
      id: `${selectedExp}-log-${idx}`,
      text: achievement.text,
      type: 'success' as const,
    })) || []

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">Deployment</span> History
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Professional experience as CI/CD pipeline executions and infrastructure evolution
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {experiences.map((exp, index) => (
              <ScrollReveal
                key={exp.id}
                direction="left"
                delay={index * 0.05}
              >
                <div
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
              </div>
              </ScrollReveal>
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
