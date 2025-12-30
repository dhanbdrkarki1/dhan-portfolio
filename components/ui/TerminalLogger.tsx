'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalLine {
  id: string
  text: string
  type: 'success' | 'info' | 'warning' | 'error' | 'default'
  timestamp?: string
}

interface TerminalLoggerProps {
  lines: TerminalLine[]
  autoScroll?: boolean
  className?: string
}

export function TerminalLogger({ lines, autoScroll = true, className = '' }: TerminalLoggerProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([])

  useEffect(() => {
    // Simulate typing effect
    lines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
      }, index * 200)
    })
  }, [lines])

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'success': return 'text-status-success'
      case 'info': return 'text-status-info'
      case 'warning': return 'text-status-warning'
      case 'error': return 'text-status-error'
      default: return 'text-gray-300'
    }
  }

  const getLinePrefix = (type: TerminalLine['type']) => {
    switch (type) {
      case 'success': return '✓'
      case 'info': return 'ℹ'
      case 'warning': return '⚠'
      case 'error': return '✗'
      default: return '›'
    }
  }

  return (
    <div className={`card-devops font-mono text-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-devops-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-status-error" />
          <div className="w-3 h-3 rounded-full bg-status-warning" />
          <div className="w-3 h-3 rounded-full bg-status-success" />
        </div>
        <span className="text-gray-400">terminal@devops-system</span>
      </div>
      
      <div className="space-y-1 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {visibleLines.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`${getLineColor(line.type)} flex items-start gap-2`}
            >
              <span className="text-gray-500 select-none">
                {line.timestamp || new Date().toLocaleTimeString()}
              </span>
              <span className="select-none">{getLinePrefix(line.type)}</span>
              <span className="flex-1">{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {visibleLines.length > 0 && (
          <motion.div
            className="flex items-center gap-2 text-neon-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: visibleLines.length * 0.2 }}
          >
            <span>$</span>
            <span className="animate-terminal-blink">_</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
