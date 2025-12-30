'use client'

import { motion } from 'framer-motion'
import { Cloud, Container, GitBranch, Shield, Eye, Terminal, Server, Layers, Award, ExternalLink } from 'lucide-react'
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

interface Certification {
  id: string
  name: string
  issuer: string
  year: number
  credentialUrl: string
  category: 'cloud' | 'monitoring' | 'devops'
}

const skills: Skill[] = [
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'cloud',
    icon: Cloud,
    tools: ['EC2', 'ECS', 'EKS', 'S3', 'Lambda', 'RDS', 'VPC', 'CloudWatch', 'IAM', 'ALB', 'SNS', 'SQS'],
    impact: 'Building scalable cloud infrastructure',
    level: 85,
    dependencies: ['terraform', 'docker'],
  },
  {
    id: 'azure',
    name: 'Azure Cloud',
    category: 'cloud',
    icon: Cloud,
    tools: ['Azure VMs', 'Storage', 'Networking', 'Resource Groups', 'Cost Management'],
    impact: 'Cross-cloud migration and management',
    level: 70,
    dependencies: ['terraform'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'container',
    icon: Container,
    tools: ['EKS', 'ECS', 'Helm', 'Kustomize', 'Karpenter', 'HPA', 'Ingress Controllers'],
    impact: 'Container orchestration at scale',
    level: 80,
    dependencies: ['docker', 'cicd'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'container',
    icon: Container,
    tools: ['Docker', 'Docker Compose', 'Multi-stage builds', 'Alpine', 'ECR'],
    impact: 'Containerizing and optimizing applications',
    level: 85,
    dependencies: ['cicd'],
  },
  {
    id: 'terraform',
    name: 'Terraform & IaC',
    category: 'iac',
    icon: Layers,
    tools: ['Terraform', 'Terragrunt', 'CloudFormation', 'Packer', 'HCL', 'State Management'],
    impact: 'Infrastructure as Code automation',
    level: 85,
    dependencies: ['aws', 'azure'],
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipelines',
    category: 'cicd',
    icon: GitBranch,
    tools: ['Jenkins', 'GitHub Actions', 'CodePipeline', 'CodeBuild', 'CodeDeploy', 'GitLab CI'],
    impact: 'Automated deployment workflows',
    level: 85,
    dependencies: ['docker', 'terraform'],
  },
  {
    id: 'ansible',
    name: 'Configuration Management',
    category: 'iac',
    icon: Terminal,
    tools: ['Ansible', 'Playbooks', 'Roles', 'Automation', 'Server Provisioning'],
    impact: 'Automated server configuration',
    level: 80,
    dependencies: [],
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Logging',
    category: 'observability',
    icon: Eye,
    tools: ['Prometheus', 'Grafana', 'New Relic', 'CloudWatch', 'APM', 'Dashboards', 'Alerts'],
    impact: 'Full-stack observability',
    level: 80,
    dependencies: ['aws', 'kubernetes'],
  },
  {
    id: 'security',
    name: 'Security & Testing',
    category: 'security',
    icon: Shield,
    tools: ['tfsec', 'Checkov', 'SonarQube', 'Trivy', 'OWASP', 'Security Hub', 'IAM'],
    impact: 'Security scanning and compliance',
    level: 75,
    dependencies: ['terraform', 'cicd'],
  },
  {
    id: 'scripting',
    name: 'Scripting & Programming',
    category: 'iac',
    icon: Terminal,
    tools: ['Python', 'Bash', 'Django', 'React', 'JavaScript', 'MySQL', 'PostgreSQL'],
    impact: 'Automation and application development',
    level: 80,
    dependencies: [],
  },
  {
    id: 'git',
    name: 'Version Control',
    category: 'cicd',
    icon: GitBranch,
    tools: ['Git', 'GitHub', 'GitLab', 'Branch Protection', 'Semantic Versioning'],
    impact: 'Code collaboration and management',
    level: 85,
    dependencies: ['cicd'],
  },
]

const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: 2024,
    credentialUrl: 'https://www.credly.com/badges/88dad0e1-fe64-4892-b8d8-44cc2b6911/public_url',
    category: 'cloud',
  },
  {
    id: 'cert-2',
    name: 'Full Stack Observability Practitioner',
    issuer: 'New Relic University',
    year: 2024,
    credentialUrl: 'https://credentials.newrelic.com/4daaeab2-303b-4590-8e55-30a72990067e',
    category: 'monitoring',
  },
  {
    id: 'cert-3',
    name: 'AWS Academy Graduate - Cloud Foundations',
    issuer: 'Amazon Web Services',
    year: 2023,
    credentialUrl: 'https://www.credly.com/badges/390cb832-ceda-4da7-9f27-e77b2b9b7dda/public_url',
    category: 'cloud',
  },
  {
    id: 'cert-4',
    name: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift',
    issuer: 'IBM Skills Network',
    year: 2023,
    credentialUrl: 'https://coursera.org/share/956f74e9912bfb5e0ee2296dcbe094e1',
    category: 'devops',
  },
  {
    id: 'cert-5',
    name: 'Continuous Integration and Continuous Delivery (CI/CD)',
    issuer: 'IBM Skills Network',
    year: 2023,
    credentialUrl: 'https://coursera.org/share/7bb154635bfb65884fe4dc9946b7f69a',
    category: 'devops',
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
            <span className="glow-text">Technical</span> Skills
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            DevOps expertise across cloud platforms, automation, and infrastructure management
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

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="glow-text">Certifications</span> & Training
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.a
                key={cert.id}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="card-devops group hover:border-neon-cyan cursor-pointer transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-cyan bg-opacity-10 rounded-lg border border-neon-cyan flex-shrink-0">
                    <Award className="w-8 h-8 text-neon-cyan" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-neon-green">{cert.year}</span>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-neon-cyan transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

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
              <h3 className="font-bold mb-2">Cost Optimization</h3>
              <p className="text-sm text-gray-400">
                Cloud cost reduction, rightsizing, lifecycle policies
              </p>
            </div>
            
            <div className="text-center">
              <GitBranch className="w-12 h-12 text-neon-green mx-auto mb-3" />
              <h3 className="font-bold mb-2">Collaboration Tools</h3>
              <p className="text-sm text-gray-400">
                Jira, Zoho, Slack, MS Teams, documentation
              </p>
            </div>
            
            <div className="text-center">
              <Shield className="w-12 h-12 text-status-error mx-auto mb-3" />
              <h3 className="font-bold mb-2">Problem Solving</h3>
              <p className="text-sm text-gray-400">
                Analytical thinking, troubleshooting, optimization
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
