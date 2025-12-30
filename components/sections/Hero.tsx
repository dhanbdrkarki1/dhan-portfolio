'use client'

import { motion } from 'framer-motion'
import { MetricCounter } from '@/components/ui/MetricCounter'
import { Terminal, Server, Cloud, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Hero() {
  const [bootComplete, setBootComplete] = useState(false)
  const [systemMessages, setSystemMessages] = useState<string[]>([])

  const bootSequence = [
    'SYSTEM INIT...',
    'Loading cloud modules... OK',
    'Initializing containers... OK',
    'Starting CI/CD pipelines... OK',
    'System ready. Welcome!',
  ]

  useEffect(() => {
    bootSequence.forEach((msg, index) => {
      setTimeout(() => {
        setSystemMessages(prev => [...prev, msg])
        if (index === bootSequence.length - 1) {
          setTimeout(() => setBootComplete(true), 500)
        }
      }, index * 300)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {/* System Boot */}
            <div className="card-devops p-4 font-mono text-xs space-y-1 max-h-32 overflow-hidden">
              {systemMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${msg.includes('OK') ? 'text-status-success' : 'text-neon-cyan'}`}
                >
                  {msg}
                </motion.div>
              ))}
            </div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: bootComplete ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="glow-text">Building</span>
                <br />
                <span className="text-gray-100">Reliable</span>
                <br />
                <span className="glow-text">Infrastructure</span>
              </h1>

              <p className="text-xl text-gray-400 max-w-2xl">
                DevOps Engineer from Kathmandu, Nepal, passionate about cloud infrastructure, 
                containerization, and CI/CD automation. Focused on building scalable and efficient systems.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="/deploy" className="btn-primary">
                  View Experience
                </a>
                <a 
                  href="/run" 
                  className="px-6 py-3 rounded-lg border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-devops-bg transition-all duration-300 font-semibold"
                >
                  Explore Projects
                </a>
              </div>
            </motion.div>

            {/* Tech Stack Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: bootComplete ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {[
                { icon: Cloud, label: 'AWS & Azure' },
                { icon: Server, label: 'Kubernetes' },
                { icon: Terminal, label: 'Terraform' },
                { icon: Zap, label: 'CI/CD' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-devops-surface border border-devops-border rounded-lg text-sm"
                >
                  <item.icon className="w-4 h-4 text-neon-cyan" />
                  <span className="text-gray-300">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Live Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: bootComplete ? 1 : 0, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              <span className="text-neon-cyan">Career</span> Highlights
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <MetricCounter
                value={2.5}
                suffix="+"
                label="Years Experience"
                duration={2.5}
                decimals={1}
              />
              
              <MetricCounter
                value={500}
                suffix="+"
                label="Deployments"
                duration={2.5}
                decimals={0}
              />
              
              <MetricCounter
                value={15}
                suffix="+"
                label="Projects"
                duration={2.5}
                decimals={0}
              />
              
              <MetricCounter
                value={99}
                suffix="%"
                label="Uptime"
                duration={2.5}
                decimals={0}
              />
            </div>

            {/* System Status */}
            <div className="card-devops space-y-3">
              <h3 className="font-mono text-sm uppercase tracking-wider text-neon-cyan">
                System Status
              </h3>
              
              <div className="space-y-2 text-sm">
                <StatusItem label="AWS Infrastructure" status="operational" />
                <StatusItem label="Kubernetes Clusters" status="operational" />
                <StatusItem label="CI/CD Pipelines" status="operational" />
                <StatusItem label="Monitoring Stack" status="operational" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-devops">
              <h3 className="font-mono text-sm uppercase tracking-wider text-neon-cyan mb-3">
                Quick Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-neon-green font-mono">AWS</div>
                  <div className="text-xs text-gray-400 uppercase">Primary Cloud</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green font-mono">Docker</div>
                  <div className="text-xs text-gray-400 uppercase">Containerization</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatusItem({ label, status }: { label: string; status: 'operational' | 'degraded' | 'down' }) {
  const colors = {
    operational: 'text-status-success',
    degraded: 'text-status-warning',
    down: 'text-status-error',
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${colors[status].replace('text-', 'bg-')} animate-pulse`} />
        <span className={`${colors[status]} text-xs uppercase font-mono`}>
          {status}
        </span>
      </div>
    </div>
  )
}
