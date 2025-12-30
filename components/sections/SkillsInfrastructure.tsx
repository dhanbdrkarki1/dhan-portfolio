'use client'

import { motion } from 'framer-motion'
import { Cloud, Container, GitBranch, Shield, Eye, Terminal, Server, Layers } from 'lucide-react'
import { useState } from 'react'

interface Skill {
  id: string
  name: string
  category: 'cloud' | 'container' | 'cicd' | 'iac' | 'observability' | 'security'
  icon: any
  tools: string[]
  impact: string
  level: number
  dependencies: string[]
}

const skills: Skill[] = [
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'cloud',
    icon: Cloud,
    tools: ['EC2', 'S3', 'Lambda', 'RDS', 'VPC', 'CloudWatch', 'IAM'],
    impact: 'Building scalable cloud infrastructure',
    level: 80,
    dependencies: ['terraform', 'docker'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'container',
    icon: Container,
    tools: ['Docker', 'Docker Compose', 'Multi-stage builds', 'Containerization'],
    impact: 'Containerizing applications efficiently',
    level: 85,
    dependencies: ['cicd'],
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'iac',
    icon: Layers,
    tools: ['Terraform', 'HCL', 'State Management', 'Modules'],
    impact: 'Infrastructure as Code implementation',
    level: 80,
    dependencies: ['aws'],
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipelines',
    category: 'cicd',
    icon: GitBranch,
    tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Automation'],
    impact: 'Automated deployment pipelines',
    level: 85,
    dependencies: ['docker', 'terraform'],
  },
  {
    id: 'linux',
    name: 'Linux & Scripting',
    category: 'iac',
    icon: Terminal,
    tools: ['Ubuntu', 'CentOS', 'Bash', 'Shell Scripting', 'Python'],
    impact: 'System administration and automation',
    level: 85,
    dependencies: [],
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    category: 'observability',
    icon: Eye,
    tools: ['CloudWatch', 'Prometheus', 'Grafana', 'Logging'],
    impact: 'System health and performance monitoring',
    level: 75,
    dependencies: ['aws'],
  },
  {
    id: 'git',
    name: 'Version Control',
    category: 'cicd',
    icon: GitBranch,
    tools: ['Git', 'GitHub', 'GitLab', 'Branching Strategies'],
    impact: 'Code collaboration and management',
    level: 85,
    dependencies: ['cicd'],
  },
  {
    id: 'security',
    name: 'Security Best Practices',
    category: 'security',
    icon: Shield,
    tools: ['IAM', 'Security Groups', 'SSL/TLS', 'Secrets Management'],
    impact: 'Secure infrastructure implementation',
    level: 75,
    dependencies: ['terraform', 'aws'],
  },
]

const categoryColors = {
  cloud: 'border-neon-blue',
  container: 'border-neon-cyan',
  cicd: 'border-neon-green',
  iac: 'border-neon-purple',
  observability: 'border-neon-yellow',
  security: 'border-status-error',
}

export function SkillsInfrastructure() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'All Services', color: 'neon-cyan' },
    { id: 'cloud', label: 'Cloud Platforms', color: 'neon-blue' },
    { id: 'container', label: 'Orchestration', color: 'neon-cyan' },
    { id: 'cicd', label: 'CI/CD', color: 'neon-green' },
    { id: 'iac', label: 'IaC & Automation', color: 'neon-purple' },
    { id: 'observability', label: 'Observability', color: 'neon-yellow' },
    { id: 'security', label: 'Security', color: 'status-error' },
  ]

  const filteredSkills = selectedCategory && selectedCategory !== 'all'
    ? skills.filter(s => s.category === selectedCategory)
    : skills

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
            <span className="glow-text">Infrastructure</span> as Code
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technical expertise visualized as interconnected cloud services and dependencies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === 'all' ? null : cat.id)}
              className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all duration-300 ${
                (selectedCategory === cat.id || (cat.id === 'all' && !selectedCategory))
                  ? `border-${cat.color} text-${cat.color} bg-${cat.color} bg-opacity-10`
                  : 'border-devops-border text-gray-400 hover:border-gray-500'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon
            const isHovered = hoveredSkill === skill.id
            const isConnected = hoveredSkill && 
              (skill.dependencies.includes(hoveredSkill) || 
               skills.find(s => s.id === hoveredSkill)?.dependencies.includes(skill.id))

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onHoverStart={() => setHoveredSkill(skill.id)}
                onHoverEnd={() => setHoveredSkill(null)}
                className={`card-devops cursor-pointer transition-all duration-300 ${
                  isHovered ? 'scale-105 z-10' : ''
                } ${
                  isConnected ? 'border-neon-cyan' : categoryColors[skill.category]
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${categoryColors[skill.category].replace('border-', '')} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${categoryColors[skill.category].replace('border-', 'text-')}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Skill Level */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neon-cyan font-mono">
                      {skill.level}%
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-devops-border rounded-full mb-4 overflow-hidden">
                  <motion.div
                    className={`h-full ${categoryColors[skill.category].replace('border-', 'bg-')}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                  />
                </div>

                {/* Tools */}
                <div className="mb-4">
                  <div className="text-xs text-gray-400 uppercase mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-devops-bg rounded text-xs text-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className={`text-sm ${isHovered ? 'text-neon-cyan' : 'text-gray-400'} transition-colors`}>
                  <span className="font-mono">→</span> {skill.impact}
                </div>

                {/* Dependencies Indicator */}
                {skill.dependencies.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-devops-border">
                    <div className="text-xs text-gray-500 font-mono">
                      Dependencies: {skill.dependencies.length}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Additional Expertise */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 card-devops"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            <span className="glow-text">Additional</span> Expertise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Server className="w-12 h-12 text-neon-cyan mx-auto mb-3" />
              <h3 className="font-bold mb-2">High Availability</h3>
              <p className="text-sm text-gray-400">
                Multi-AZ deployments, load balancing, auto-scaling
              </p>
            </div>
            
            <div className="text-center">
              <GitBranch className="w-12 h-12 text-neon-green mx-auto mb-3" />
              <h3 className="font-bold mb-2">GitOps</h3>
              <p className="text-sm text-gray-400">
                Infrastructure as code, version-controlled deployments
              </p>
            </div>
            
            <div className="text-center">
              <Shield className="w-12 h-12 text-status-error mx-auto mb-3" />
              <h3 className="font-bold mb-2">Zero Trust Security</h3>
              <p className="text-sm text-gray-400">
                IAM policies, network segmentation, compliance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
