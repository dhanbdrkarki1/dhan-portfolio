'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Terminal, Boxes, Rocket, Play, Settings } from 'lucide-react'

const stages = [
  { id: 'init', label: 'Init', icon: Terminal, path: '/' },
  { id: 'build', label: 'Build', icon: Boxes, path: '/build' },
  { id: 'deploy', label: 'Deploy', icon: Rocket, path: '/deploy' },
  { id: 'run', label: 'Run', icon: Play, path: '/run' },
  { id: 'optimize', label: 'Optimize', icon: Settings, path: '/optimize' },
]

export function PipelineNavigator() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeStage, setActiveStage] = useState('init')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Update active stage whenever pathname changes
    const stage = stages.find(s => s.path === pathname || pathname.startsWith(s.path + '/'))
    if (stage) {
      setActiveStage(stage.id)
    }
  }, [pathname])

  if (!mounted) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-devops-surface bg-opacity-90 backdrop-blur-md border-b border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Terminal className="w-6 h-6 text-neon-cyan" />
            <span className="fgont-mono font-bold text-lg glow-text">Dhan.dev</span>
          </Link>

          {/* Pipeline Stages */}
          <div className="hidden md:flex items-center gap-1">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              const isActive = activeStage === stage.id
              const isCompleted = stages.findIndex(s => s.id === activeStage) > index

              return (
                <div key={stage.id} className="flex items-center">
                  <Link
                    href={stage.path}
                    className={`pipeline-stage px-4 py-2 rounded-lg ${
                      isActive ? 'active bg-neon-cyan bg-opacity-10' : ''
                    } ${isCompleted ? 'completed' : 'text-gray-400'}`}
                    onClick={() => setActiveStage(stage.id)}
                  >
                    <Icon className="w-4 h-4 inline mr-2" />
                    {stage.label}
                  </Link>
                  
                  {index < stages.length - 1 && (
                    <div className={`w-8 h-px ${
                      isCompleted ? 'bg-neon-green' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Menu - Simplified */}
          <div className="md:hidden">
            <select
              value={activeStage}
              onChange={(e) => {
                const stage = stages.find(s => s.id === e.target.value)
                if (stage) {
                  setActiveStage(stage.id)
                  router.push(stage.path)
                }
              }}
              className="bg-devops-surface border border-devops-border rounded px-3 py-2 text-sm font-mono text-neon-cyan"
            >
              {stages.map(stage => (
                <option key={stage.id} value={stage.id}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        className="h-0.5 bg-neon-cyan"
        initial={{ width: '0%' }}
        animate={{ 
          width: `${((stages.findIndex(s => s.id === activeStage) + 1) / stages.length) * 100}%` 
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </nav>
  )
}
