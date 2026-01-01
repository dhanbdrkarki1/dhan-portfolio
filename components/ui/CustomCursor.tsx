'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Position {
  x: number
  y: number
}

type CursorContext = 'default' | 'code' | 'input' | 'link' | 'button' | 'card'
type KeyDirection = 'up' | 'down' | 'left' | 'right' | 'top' | 'bottom' | null

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })
  const [ringPosition, setRingPosition] = useState<Position>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isDoubleClick, setIsDoubleClick] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [magneticOffset, setMagneticOffset] = useState<Position>({ x: 0, y: 0 })
  const [magneticTarget, setMagneticTarget] = useState<Position | null>(null)
  const [velocity, setVelocity] = useState(0)
  const [cursorContext, setCursorContext] = useState<CursorContext>('default')
  const [keyDirection, setKeyDirection] = useState<KeyDirection>(null)
  const [fps, setFps] = useState(60)
  
  const idleTimerRef = useRef<NodeJS.Timeout>()
  const rafRef = useRef<number>()
  const targetRingPosition = useRef<Position>({ x: 0, y: 0 })
  const lastPosition = useRef<Position>({ x: 0, y: 0 })
  const lastTime = useRef<number>(Date.now())
  const lastClickTime = useRef<number>(0)
  const frameTimesRef = useRef<number[]>([])
  const lastFrameTime = useRef<number>(Date.now())

  // Check if cursor should be disabled
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isMobile || prefersReducedMotion) {
      setIsVisible(false)
      return
    }
    
    setIsVisible(true)
  }, [])

  // Smooth ring animation with lag effect + FPS tracking
  useEffect(() => {
    if (!isVisible) return

    const animateRing = () => {
      // FPS calculation
      const now = Date.now()
      const frameDelta = now - lastFrameTime.current
      lastFrameTime.current = now
      
      frameTimesRef.current.push(frameDelta)
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift()
      }
      
      if (frameTimesRef.current.length >= 10) {
        const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length
        const currentFps = Math.round(1000 / avgFrameTime)
        setFps(currentFps)
      }
      
      setRingPosition((prev) => {
        const dx = targetRingPosition.current.x - prev.x
        const dy = targetRingPosition.current.y - prev.y
        
        // Lag effect: move 15% towards target each frame
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        }
      })
      
      rafRef.current = requestAnimationFrame(animateRing)
    }
    
    rafRef.current = requestAnimationFrame(animateRing)
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isVisible])

  // Mouse move handler with velocity, magnetic behavior
  useEffect(() => {
    if (!isVisible) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      
      // Calculate velocity for glow intensity
      const now = Date.now()
      const deltaTime = now - lastTime.current
      const deltaX = x - lastPosition.current.x
      const deltaY = y - lastPosition.current.y
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const currentVelocity = deltaTime > 0 ? distance / deltaTime : 0
      
      // Smooth velocity with exponential moving average
      setVelocity(prev => prev * 0.7 + currentVelocity * 0.3)
      
      lastPosition.current = { x, y }
      lastTime.current = now
      
      // Reset idle timer
      setIsIdle(false)
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 2000)
      
      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('.btn-primary, .card-devops, a:not([data-no-magnetic]), button:not([data-no-magnetic])')
      let closestElement: HTMLElement | null = null
      let minDistance = 120 // Max magnetic distance
      
      magneticElements.forEach((element) => {
        const htmlElement = element as HTMLElement
        const rect = htmlElement.getBoundingClientRect()
        const elementCenterX = rect.left + rect.width / 2
        const elementCenterY = rect.top + rect.height / 2
        
        const dist = Math.sqrt(
          Math.pow(x - elementCenterX, 2) + Math.pow(y - elementCenterY, 2)
        )
        
        if (dist < minDistance) {
          minDistance = dist
          closestElement = htmlElement
        }
      })
      
      // Calculate magnetic offset
      if (closestElement && minDistance < 120) {
        const element = closestElement as HTMLElement
        const rect = element.getBoundingClientRect()
        const elementCenterX = rect.left + rect.width / 2
        const elementCenterY = rect.top + rect.height / 2
        
        const dx = elementCenterX - x
        const dy = elementCenterY - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Determine max pull based on element type
        const isButton = element.classList.contains('btn-primary') || element.tagName === 'BUTTON'
        const maxPull = isButton ? 8 : 4
        
        // Ease function for smooth magnetic pull
        const strength = Math.max(0, 1 - dist / 120)
        const pullX = (dx / dist) * maxPull * strength
        const pullY = (dy / dist) * maxPull * strength
        
        setMagneticOffset({ x: pullX, y: pullY })
        setMagneticTarget({ x: elementCenterX, y: elementCenterY })
      } else {
        setMagneticOffset({ x: 0, y: 0 })
        setMagneticTarget(null)
      }
      
      // Update positions
      setMousePosition({ x, y })
      targetRingPosition.current = { x, y }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Determine cursor context for color changes
      let context: CursorContext = 'default'
      
      // Check for code/terminal elements (green)
      if (
        target.classList.contains('terminal-text') ||
        target.classList.contains('font-mono') ||
        target.tagName === 'CODE' ||
        target.tagName === 'PRE' ||
        target.closest('pre') ||
        target.closest('.terminal-text')
      ) {
        context = 'code'
      }
      // Check for input elements (purple)
      else if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        context = 'input'
      }
      // Check for links (blue pulse)
      else if (
        target.tagName === 'A' ||
        target.closest('a')
      ) {
        context = 'link'
      }
      // Check for buttons (orange)
      else if (
        target.tagName === 'BUTTON' ||
        target.classList.contains('btn-primary') ||
        target.closest('button')
      ) {
        context = 'button'
      }
      // Check for cards (cyan)
      else if (
        target.classList.contains('card-devops') ||
        target.closest('.card-devops')
      ) {
        context = 'card'
      }
      
      setCursorContext(context)
      
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('btn-primary') ||
        target.classList.contains('card-devops') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorContext('default')
    }

    const handleMouseDown = () => {
      const now = Date.now()
      const timeSinceLastClick = now - lastClickTime.current
      
      // Detect double click (within 300ms)
      if (timeSinceLastClick < 300) {
        setIsDoubleClick(true)
        setTimeout(() => setIsDoubleClick(false), 600)
      }
      
      lastClickTime.current = now
      setIsClicking(true)
      setTimeout(() => setIsClicking(false), 400)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect vim navigation keys
      const keyMap: Record<string, KeyDirection> = {
        'j': 'down',
        'k': 'up',
        'h': 'left',
        'l': 'right',
        'ArrowDown': 'down',
        'ArrowUp': 'up',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
      }
      
      if (keyMap[e.key]) {
        setKeyDirection(keyMap[e.key])
        setTimeout(() => setKeyDirection(null), 500)
      }
      
      // Detect gg/G for top/bottom
      if (e.key === 'g') {
        setKeyDirection('top')
        setTimeout(() => setKeyDirection(null), 500)
      }
      if (e.key === 'G') {
        setKeyDirection('bottom')
        setTimeout(() => setKeyDirection(null), 500)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [isVisible])

  if (!isVisible) return null

  const dotX = mousePosition.x + magneticOffset.x
  const dotY = mousePosition.y + magneticOffset.y
  const ringX = ringPosition.x + magneticOffset.x * 0.5
  const ringY = ringPosition.y + magneticOffset.y * 0.5

  // Calculate glow intensity based on velocity (0.3 to 1.0)
  const glowIntensity = Math.min(1, 0.3 + velocity * 0.7)
  
  // Get context-aware colors
  const getContextColor = () => {
    switch (cursorContext) {
      case 'code': return { primary: '#10b981', shadow: 'rgba(16, 185, 129, 0.5)' } // neon-green
      case 'input': return { primary: '#a855f7', shadow: 'rgba(168, 85, 247, 0.5)' } // neon-purple
      case 'link': return { primary: '#0ea5e9', shadow: 'rgba(14, 165, 233, 0.5)' } // neon-blue
      case 'button': return { primary: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.5)' } // orange
      case 'card': return { primary: '#00f5ff', shadow: 'rgba(0, 245, 255, 0.5)' } // neon-cyan
      default: return { primary: '#00f5ff', shadow: 'rgba(0, 245, 255, 0.5)' } // default cyan
    }
  }
  
  const colors = getContextColor()
  
  // FPS health color
  const fpsColor = fps >= 55 ? '#10b981' : fps >= 45 ? '#f59e0b' : '#ef4444'

  return (
    <>
      {/* Magnetic Pull Visualization */}
      {magneticTarget && (
        <svg
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9997]"
          style={{ mixBlendMode: 'screen' }}
        >
          <defs>
            <linearGradient id="magneticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.6" />
              <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1={dotX}
            y1={dotY}
            x2={magneticTarget.x}
            y2={magneticTarget.y}
            stroke="url(#magneticGradient)"
            strokeWidth="1"
            opacity={glowIntensity * 0.5}
          />
        </svg>
      )}
      
      {/* Cursor Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          left: dotX,
          top: dotY,
          backgroundColor: colors.primary,
          boxShadow: `
            0 0 ${10 * glowIntensity}px ${colors.primary},
            0 0 ${20 * glowIntensity}px ${colors.shadow}
          `,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Cursor Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          left: ringX,
          top: ringY,
          borderColor: colors.primary,
          boxShadow: `
            0 0 ${20 * glowIntensity}px ${colors.shadow},
            inset 0 0 ${20 * glowIntensity}px ${colors.shadow}
          `,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isIdle ? 0.3 : glowIntensity,
          rotate: keyDirection ? (keyDirection === 'up' || keyDirection === 'top' ? -90 : keyDirection === 'down' || keyDirection === 'bottom' ? 90 : keyDirection === 'left' ? 180 : 0) : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Keyboard Direction Indicator */}
        {keyDirection && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-xs font-mono" style={{ color: colors.primary }}>
              {keyDirection === 'top' ? '⇈' : keyDirection === 'bottom' ? '⇊' : '→'}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Click Ripple */}
      <AnimatePresence>
        {isClicking && !isDoubleClick && (
          <motion.div
            className="cursor-ripple"
            style={{
              left: dotX,
              top: dotY,
              borderColor: colors.primary,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
        
        {/* Double-Click Burst Effect */}
        {isDoubleClick && (
          <>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <motion.div
                key={angle}
                className="cursor-ripple"
                style={{
                  left: dotX,
                  top: dotY,
                  borderColor: colors.primary,
                }}
                initial={{ scale: 0.5, opacity: 1, x: 0, y: 0 }}
                animate={{
                  scale: 1.5,
                  opacity: 0,
                  x: Math.cos(angle * Math.PI / 180) * 40,
                  y: Math.sin(angle * Math.PI / 180) * 40,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  )
}
