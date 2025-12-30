'use client'

import { motion } from 'framer-motion'
import { FileText, Clock, TrendingUp, AlertTriangle, Shield } from 'lucide-react'

interface Article {
  id: string
  title: string
  description: string
  category: 'architecture' | 'performance' | 'incident' | 'security'
  date: string
  readTime: string
  metrics?: {
    label: string
    value: string
  }[]
}

const articles: Article[] = [
  {
    id: 'art-1',
    title: 'Reducing AWS Costs: A 60% Cost Optimization Journey',
    description: 'How we analyzed spending patterns, implemented Reserved Instances, and right-sized resources to achieve significant cost savings.',
    category: 'performance',
    date: '2024-12-15',
    readTime: '8 min',
    metrics: [
      { label: 'Cost Saved', value: '60%' },
      { label: 'ROI', value: '$250K/yr' },
    ],
  },
  {
    id: 'art-2',
    title: 'Zero-Downtime Kubernetes Deployments',
    description: 'Implementing rolling updates, health checks, and circuit breakers for resilient deployments on EKS.',
    category: 'architecture',
    date: '2024-12-01',
    readTime: '10 min',
    metrics: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Deploy Time', value: '4 min' },
    ],
  },
  {
    id: 'art-3',
    title: 'Incident Report: Database Connection Pool Exhaustion',
    description: 'Root cause analysis and remediation of a production incident affecting 15% of users.',
    category: 'incident',
    date: '2024-11-20',
    readTime: '12 min',
    metrics: [
      { label: 'MTTR', value: '23 min' },
      { label: 'Impact', value: '15% users' },
    ],
  },
  {
    id: 'art-4',
    title: 'Securing CI/CD Pipelines: Best Practices',
    description: 'Implementing secret scanning, vulnerability detection, and compliance checks in GitHub Actions.',
    category: 'security',
    date: '2024-11-05',
    readTime: '7 min',
    metrics: [
      { label: 'Vulns Found', value: '47' },
      { label: 'Vulns Fixed', value: '47' },
    ],
  },
  {
    id: 'art-5',
    title: 'Terraform State Management at Scale',
    description: 'Managing infrastructure state across multiple teams and environments with Terragrunt and S3 backends.',
    category: 'architecture',
    date: '2024-10-18',
    readTime: '9 min',
    metrics: [
      { label: 'Teams', value: '10' },
      { label: 'Resources', value: '2500+' },
    ],
  },
  {
    id: 'art-6',
    title: 'Building a 90% Faster CI/CD Pipeline',
    description: 'Optimizing Docker builds, implementing layer caching, and parallelizing tests.',
    category: 'performance',
    date: '2024-10-01',
    readTime: '11 min',
    metrics: [
      { label: 'Before', value: '45 min' },
      { label: 'After', value: '4 min' },
    ],
  },
]

const categoryConfig = {
  architecture: {
    label: 'Architecture',
    icon: FileText,
    color: 'text-neon-cyan border-neon-cyan',
  },
  performance: {
    label: 'Performance',
    icon: TrendingUp,
    color: 'text-neon-green border-neon-green',
  },
  incident: {
    label: 'Incident',
    icon: AlertTriangle,
    color: 'text-status-warning border-status-warning',
  },
  security: {
    label: 'Security',
    icon: Shield,
    color: 'text-status-error border-status-error',
  },
}

export function ObservabilityDashboard() {
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
            <span className="glow-text">Knowledge</span> Base
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technical articles, architecture decisions, and lessons learned from production
          </p>
        </motion.div>

        {/* Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4 mb-12"
        >
          <div className="card-devops text-center">
            <FileText className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-200 font-mono mb-1">
              {articles.length}
            </div>
            <div className="text-sm text-gray-400 uppercase">Articles</div>
          </div>
          
          {Object.entries(categoryConfig).slice(0, 3).map(([key, config]) => {
            const Icon = config.icon
            const count = articles.filter(a => a.category === key).length
            return (
              <div key={key} className="card-devops text-center">
                <Icon className={`w-8 h-8 mx-auto mb-2 ${config.color}`} />
                <div className="text-2xl font-bold text-gray-200 font-mono mb-1">
                  {count}
                </div>
                <div className="text-sm text-gray-400 uppercase">{config.label}</div>
              </div>
            )
          })}
        </motion.div>

        {/* Articles Grid */}
        <div className="space-y-6">
          {articles.map((article, index) => {
            const config = categoryConfig[article.category]
            const Icon = config.icon

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-devops group cursor-pointer hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Category Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-lg border ${config.color} bg-opacity-10 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 ${config.color}`} />
                    </div>
                  </div>

                  {/* Middle: Content */}
                  <div className="flex-1">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full border text-xs font-mono uppercase ${config.color}`}>
                        {config.label}
                      </span>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime} read</span>
                      </div>
                      
                      <span className="text-xs text-gray-500">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  {/* Right: Metrics */}
                  {article.metrics && article.metrics.length > 0 && (
                    <div className="flex-shrink-0 space-y-2">
                      {article.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-devops-bg border border-devops-border rounded-lg p-3 min-w-[120px]"
                        >
                          <div className="text-xs text-gray-400 uppercase mb-1">
                            {metric.label}
                          </div>
                          <div className="text-xl font-bold text-neon-cyan font-mono">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="card-devops inline-block">
            <p className="text-gray-400 font-mono">
              More articles coming soon. Follow my journey in DevOps and cloud engineering.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
