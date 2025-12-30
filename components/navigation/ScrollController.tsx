'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const routes = [
  { path: '/', name: 'Init' },
  { path: '/build', name: 'Build' },
  { path: '/deploy', name: 'Deploy' },
  { path: '/run', name: 'Run' },
  { path: '/optimize', name: 'Optimize' },
]

export function ScrollController() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let ggTimeout: NodeJS.Timeout
    let ggPressed = false

    const getCurrentIndex = () => {
      const index = routes.findIndex(route => route.path === pathname)
      return index !== -1 ? index : 0
    }

    const navigateToSection = (index: number) => {
      if (index < 0 || index >= routes.length) return
      setIsScrolling(true)
      router.push(routes[index].path)
      
      setTimeout(() => {
        setIsScrolling(false)
      }, 800)
    }

    // Mouse wheel navigation
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      const atTop = window.scrollY === 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10
      const currentIndex = getCurrentIndex()

      if (e.deltaY > 0 && atBottom && currentIndex < routes.length - 1) {
        e.preventDefault()
        navigateToSection(currentIndex + 1)
      } else if (e.deltaY < 0 && atTop && currentIndex > 0) {
        e.preventDefault()
        navigateToSection(currentIndex - 1)
      }
    }

    // Vim-style keyboard navigation
    const handleKeyboard = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const currentIndex = getCurrentIndex()

      // j or down arrow - next section
      if ((e.key === 'j' || e.key === 'ArrowDown') && currentIndex < routes.length - 1) {
        e.preventDefault()
        navigateToSection(currentIndex + 1)
      }
      // k or up arrow - previous section
      else if ((e.key === 'k' || e.key === 'ArrowUp') && currentIndex > 0) {
        e.preventDefault()
        navigateToSection(currentIndex - 1)
      }
      // g g - go to first section
      else if (e.key === 'g') {
        if (ggPressed) {
          e.preventDefault()
          navigateToSection(0)
          ggPressed = false
          clearTimeout(ggTimeout)
        } else {
          ggPressed = true
          ggTimeout = setTimeout(() => {
            ggPressed = false
          }, 500)
        }
      }
      // G (Shift+g) - go to last section
      else if (e.key === 'G') {
        e.preventDefault()
        navigateToSection(routes.length - 1)
      }
      // h - go to home
      else if (e.key === 'h') {
        e.preventDefault()
        navigateToSection(0)
      }
      // l - go to next
      else if (e.key === 'l' && currentIndex < routes.length - 1) {
        e.preventDefault()
        navigateToSection(currentIndex + 1)
      }
      // Number keys 1-5 for direct navigation
      else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const index = parseInt(e.key) - 1
        if (index < routes.length) {
          e.preventDefault()
          navigateToSection(index)
        }
      }
      // ? - show keyboard hints
      else if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('toggle-keyboard-hints'))
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyboard)
      clearTimeout(scrollTimeout)
      clearTimeout(ggTimeout)
    }
  }, [pathname, isScrolling, router])

  return null
}
