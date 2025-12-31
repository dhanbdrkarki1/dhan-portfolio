'use client'

import { motion } from 'framer-motion'
import { Terminal, Server, Cloud, Zap, MapPin, Clock, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { resumeData } from '@/data/resume'

const { personal, terminalCommands } = resumeData

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [currentTime, setCurrentTime] = useState('')
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['Type "help" for available commands'])

  // Role typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % personal.roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Kathmandu time display
  useEffect(() => {
    const updateTime = () => {
      const kathmanduTime = new Intl.DateTimeFormat('en-US', {
        timeZone: personal.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
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
      
      if (command === 'help') {
        response = `Available commands: ${terminalCommands.map(cmd => cmd.command).join(', ')}, clear`
      } else if (command === 'clear') {
        setTerminalOutput([])
        setTerminalInput('')
        return
      } else {
        const foundCommand = terminalCommands.find(cmd => cmd.command === command)
        response = foundCommand
          ? foundCommand.response
          : `Command not found: ${command}. Type "help" for available commands.`
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
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 text-neon-green" />
                  <span className="font-mono">{currentTime} NPT</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gray-100">{personal.name}</span>
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
                  {personal.roles[currentRole]}
                </motion.p>
              </div>

              <p className="text-xl text-gray-400 max-w-2xl">
                {personal.bio}
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
            </div>
          </motion.div>

          {/* Right: Stats & Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Portfolio Stats */}
            <div className="card-devops space-y-3">
              <h3 className="font-mono text-sm uppercase tracking-wider text-neon-cyan">
                Portfolio Overview
              </h3>
              
              <div className="space-y-2 text-sm">
                {personal.stats.map((stat) => (
                  <StatItem 
                    key={stat.id}
                    icon={stat.icon} 
                    label={stat.label} 
                    value={String(stat.value)} 
                    color={stat.color || 'text-neon-cyan'} 
                  />
                ))}
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
