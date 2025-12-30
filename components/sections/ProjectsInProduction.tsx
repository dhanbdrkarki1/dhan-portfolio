'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Server, Gauge, DollarSign, CheckCircle } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  status: 'running' | 'deployed' | 'staging'
  uptime: number
  techStack: string[]
  architecture: string
  metrics: {
    label: string
    value: string
    icon: any
  }[]
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'AWS ECS CI/CD Pipeline',
    description: 'Automated deployment pipeline for containerized applications using ECS, Terraform, and GitHub Actions',
    status: 'running',
    uptime: 99.9,
    architecture: 'ECS Fargate + ALB + ECR + CloudWatch',
    techStack: ['AWS ECS', 'Terraform', 'GitHub Actions', 'Docker', 'CloudWatch'],
    metrics: [
      { label: 'Deploy Time', value: '4 min', icon: Gauge },
      { label: 'Cost', value: '$120/mo', icon: DollarSign },
      { label: 'Uptime', value: '99.9%', icon: CheckCircle },
    ],
    github: 'https://github.com',
  },
  {
    id: 'proj-2',
    name: 'Kubernetes Auto-Scaling Platform',
    description: 'EKS cluster with Karpenter auto-scaling, Helm charts, and Prometheus monitoring',
    status: 'running',
    uptime: 99.95,
    architecture: 'EKS + Karpenter + ALB Ingress + Prometheus',
    techStack: ['AWS EKS', 'Kubernetes', 'Karpenter', 'Helm', 'Prometheus', 'Grafana'],
    metrics: [
      { label: 'Nodes', value: '3-15', icon: Server },
      { label: 'Cost', value: '$450/mo', icon: DollarSign },
      { label: 'Uptime', value: '99.95%', icon: CheckCircle },
    ],
    github: 'https://github.com',
  },
  {
    id: 'proj-3',
    name: 'Multi-Cloud Terraform Modules',
    description: 'Reusable IaC modules for AWS and Azure with security scanning and automated testing',
    status: 'deployed',
    uptime: 100,
    architecture: 'Terraform + Terragrunt + tfsec + Checkov',
    techStack: ['Terraform', 'Terragrunt', 'AWS', 'Azure', 'tfsec', 'Checkov'],
    metrics: [
      { label: 'Modules', value: '25+', icon: Server },
      { label: 'Scans', value: 'Pass', icon: CheckCircle },
      { label: 'Usage', value: '10 teams', icon: Gauge },
    ],
    github: 'https://github.com',
  },
  {
    id: 'proj-4',
    name: 'Blue/Green Deployment System',
    description: 'Zero-downtime deployment strategy with automated rollback and health checks',
    status: 'running',
    uptime: 99.8,
    architecture: 'ECS + ALB + Target Groups + CodeDeploy',
    techStack: ['AWS ECS', 'CodeDeploy', 'ALB', 'CloudWatch', 'SNS'],
    metrics: [
      { label: 'Deploys', value: '500+', icon: Gauge },
      { label: 'Rollbacks', value: '0', icon: CheckCircle },
      { label: 'Downtime', value: '0 min', icon: CheckCircle },
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 'proj-5',
    name: 'Observability Stack',
    description: 'Complete monitoring solution with Prometheus, Grafana, and alerting',
    status: 'running',
    uptime: 99.99,
    architecture: 'Prometheus + Grafana + AlertManager + Loki',
    techStack: ['Prometheus', 'Grafana', 'Loki', 'AlertManager', 'CloudWatch'],
    metrics: [
      { label: 'Metrics', value: '10K/s', icon: Gauge },
      { label: 'Alerts', value: '50+', icon: Server },
      { label: 'Uptime', value: '99.99%', icon: CheckCircle },
    ],
    demo: 'https://grafana.demo.com',
  },
  {
    id: 'proj-6',
    name: 'Automated Backup & DR',
    description: 'Cross-region backup automation with disaster recovery testing',
    status: 'deployed',
    uptime: 100,
    architecture: 'Lambda + S3 + RDS Snapshots + SNS',
    techStack: ['AWS Lambda', 'S3', 'RDS', 'CloudWatch Events', 'SNS'],
    metrics: [
      { label: 'Backups', value: 'Daily', icon: Server },
      { label: 'RPO', value: '1 hour', icon: Gauge },
      { label: 'RTO', value: '4 hours', icon: CheckCircle },
    ],
    github: 'https://github.com',
  },
]

const statusColors = {
  running: 'text-status-success border-status-success',
  deployed: 'text-neon-cyan border-neon-cyan',
  staging: 'text-status-warning border-status-warning',
}

export function ProjectsInProduction() {
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
            <span className="glow-text">Services</span> in Production
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-world infrastructure and automation projects running at scale
          </p>
        </motion.div>

        {/* System Status Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4 mb-12"
        >
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-green font-mono mb-2">
              {projects.length}
            </div>
            <div className="text-sm text-gray-400 uppercase">Active Services</div>
          </div>
          
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-cyan font-mono mb-2">
              99.9%
            </div>
            <div className="text-sm text-gray-400 uppercase">Avg Uptime</div>
          </div>
          
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-cyan font-mono mb-2">
              2.8K
            </div>
            <div className="text-sm text-gray-400 uppercase">Total Deploys</div>
          </div>
          
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-green font-mono mb-2">
              0
            </div>
            <div className="text-sm text-gray-400 uppercase">Incidents</div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card-devops group"
            >
              {/* Status Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${statusColors[project.status].replace('text-', 'bg-')} animate-pulse`} />
                  <span className={`text-xs font-mono uppercase ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="text-xs text-gray-400 font-mono">
                  Uptime: {project.uptime}%
                </div>
              </div>

              {/* Project Info */}
              <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">
                {project.name}
              </h3>
              
              <p className="text-gray-400 mb-4 text-sm">
                {project.description}
              </p>

              {/* Architecture */}
              <div className="mb-4 p-3 bg-devops-bg rounded-lg border border-devops-border">
                <div className="text-xs text-gray-500 uppercase mb-1">Architecture</div>
                <div className="text-sm font-mono text-neon-cyan">
                  {project.architecture}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 uppercase mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-devops-bg rounded text-xs text-gray-300 border border-devops-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {project.metrics.map((metric, idx) => {
                  const Icon = metric.icon
                  return (
                    <div
                      key={idx}
                      className="text-center p-2 bg-devops-bg rounded border border-devops-border"
                    >
                      <Icon className="w-4 h-4 text-neon-cyan mx-auto mb-1" />
                      <div className="text-sm font-bold text-gray-200 font-mono">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500">{metric.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-devops-border">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-devops-bg hover:bg-neon-cyan hover:bg-opacity-10 border border-neon-cyan rounded-lg text-sm transition-all duration-300 flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                )}
                
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-neon-cyan hover:bg-neon-blue text-devops-bg rounded-lg text-sm transition-all duration-300 flex-1 justify-center font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
