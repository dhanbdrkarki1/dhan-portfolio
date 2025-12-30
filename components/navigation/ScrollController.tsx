'use client'

import { useEffect, useRef } from 'react'
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
  const isNavigatingRef = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    let ggTimeout: NodeJS.Timeout
    let ggPressed = false

    const getCurrentIndex = () => {
      const index = routes.findIndex(route => route.path === pathname)
      return index !== -1 ? index : 0
    }

    const navigateToSection = (index: number) => {
      if (index < 0 || index >= routes.length || isNavigatingRef.current) return
      
      isNavigatingRef.current = true
      router.push(routes[index].path)
      
      setTimeout(() => {
        isNavigatingRef.current = false
      }, 300)
    }

    // Vim-style keyboard navigation
    const handleKeyboard = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const currentIndex = getCurrentIndex()

      // j or down arrow - next section
      if (e.key === 'j' || e.key === 'ArrowDown') {
        if (currentIndex < routes.length - 1) {
          e.preventDefault()
          e.stopPropagation()
          navigateToSection(currentIndex + 1)
        }
        return
      }
      
      // k or up arrow - previous section
      if (e.key === 'k' || e.key === 'ArrowUp') {
        if (currentIndex > 0) {
          e.preventDefault()
          e.stopPropagation()
          navigateToSection(currentIndex - 1)
        }
        return
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

    window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('keydown', handleKeyboard)
      clearTimeout(ggTimeout)
    }
  }, [pathname, router])

  return null
}
