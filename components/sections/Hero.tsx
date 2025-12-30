'use client'

import { motion } from 'framer-motion'
import { MetricCounter } from '@/components/ui/MetricCounter'
import { Terminal, Server, Cloud, Zap, MapPin, Clock, Award } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Hero() {
  const [bootComplete, setBootComplete] = useState(false)
  const [systemMessages, setSystemMessages] = useState<string[]>([])
  const [currentRole, setCurrentRole] = useState(0)
  const [currentTime, setCurrentTime] = useState('')
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Type "help" for available commands'])

  const roles = [
    'DevOps Engineer',
    'Cloud Infrastructure Specialist',
    'CI/CD Automation Expert',
    'Infrastructure as Code Developer',
  ]

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

  // Role typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Kathmandu time display
  useEffect(() => {
    const updateTime = () => {
      const kathmanduTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date())
      setCurrentTime(kathmanduTime)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Terminal command handler
  const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = terminalInput.trim().toLowerCase()
      let response = ''
      
      switch (command) {
        case 'help':
          response = 'Available commands: whoami, skills, experience, contact, clear'
          break
        case 'whoami':
          response = 'Dhan Bahadur Karki - DevOps Engineer from Kathmandu, Nepal'
          break
        case 'skills':
          response = 'AWS, Azure, Kubernetes, Docker, Terraform, CI/CD, Ansible, Python'
          break
        case 'experience':
          response = '2.5 years | Progressive Labs, CropBytes, Digo Solutions'
          break
        case 'contact':
          response = 'Email: dhanbdrkarki111@gmail.com | GitHub: @dhanbdrkarki1'
          break
        case 'clear':
          setTerminalOutput([])
          setTerminalInput('')
          return
        default:
          response = `Command not found: ${command}. Type "help" for available commands.`
      }
      
      setTerminalOutput(prev => [...prev, `$ ${terminalInput}`, response])
      setTerminalInput('')
    }
  }

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
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 text-neon-green" />
                  <span className="font-mono">{currentTime} NPT</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gray-100">Dhan Bahadur Karki</span>
              </h1>

              <div className="h-12">
                <motion.p
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold glow-text"
                >
                  {roles[currentRole]}
                </motion.p>
              </div>

              <p className="text-xl text-gray-400 max-w-2xl">
                Passionate about cloud infrastructure, containerization, and CI/CD automation. 
                Focused on building scalable, efficient, and cost-optimized systems.
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

            {/* Portfolio Stats */}
            <div className="card-devops space-y-3">
              <h3 className="font-mono text-sm uppercase tracking-wider text-neon-cyan">
                Portfolio Overview
              </h3>
              
              <div className="space-y-2 text-sm">
                <StatItem icon={Server} label="Companies" value="3" color="text-neon-cyan" />
                <StatItem icon={Award} label="Certifications" value="5" color="text-neon-green" />
                <StatItem icon={Terminal} label="GitHub Repos" value="4" color="text-neon-purple" />
                <StatItem icon={Cloud} label="Primary Cloud" value="AWS" color="text-neon-blue" />
              </div>
            </div>

            {/* Interactive Terminal */}
            <div className="card-devops">
              <h3 className="font-mono text-sm uppercase tracking-wider text-neon-cyan mb-3">
                Interactive Terminal
              </h3>
              
              <div className="bg-devops-bg rounded border border-devops-border p-3 font-mono text-xs max-h-40 overflow-y-auto">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className={line.startsWith('$') ? 'text-neon-green mt-2' : 'text-gray-400'}>
                    {line}
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-neon-green">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalCommand}
                    className="flex-1 bg-transparent outline-none text-gray-300"
                    placeholder="Type a command..."
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-gray-300">{label}</span>
      </div>
      <span className={`${color} font-mono font-bold`}>{value}</span>
    </div>
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
