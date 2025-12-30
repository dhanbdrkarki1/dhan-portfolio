'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface MetricCounterProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

export function MetricCounter({ 
  value, 
  label, 
  suffix = '', 
  prefix = '',
  duration = 2,
  decimals = 0 
}: MetricCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = easeOutQuart * value

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="metric-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="metric-value">
          {prefix}
          {count.toFixed(decimals)}
          {suffix}
        </div>
        <div className="metric-label">{label}</div>
      </motion.div>
    </div>
  )
}
