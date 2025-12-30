'use client'

import { useState, useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function KeyboardHints() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // Show hint for first-time visitors after 3 seconds
    const hasSeenHint = localStorage.getItem('keyboard-hints-seen')
    if (!hasSeenHint) {
      const timer = setTimeout(() => {
        setShowHint(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev)
    window.addEventListener('toggle-keyboard-hints', handleToggle)
    return () => window.removeEventListener('toggle-keyboard-hints', handleToggle)
  }, [])

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem('keyboard-hints-seen', 'true')
  }

  return (
    <>
      {/* Floating hint for first-time visitors */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 z-40"
          >
            <div className="bg-neon-cyan bg-opacity-10 border border-neon-cyan rounded-lg p-4 backdrop-blur-sm relative">
              <button
                onClick={dismissHint}
                className="absolute -top-2 -right-2 bg-devops-bg border border-neon-cyan rounded-full p-1 hover:bg-neon-cyan hover:bg-opacity-20 transition-colors"
              >
                <X className="w-3 h-3 text-neon-cyan" />
              </button>
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-neon-cyan" />
                <div>
                  <div className="text-sm font-semibold text-neon-cyan">Tip: Use keyboard navigation!</div>
                  <div className="text-xs text-gray-400 mt-1">Press <kbd className="px-1 py-0.5 bg-devops-border rounded text-neon-cyan">?</kbd> for shortcuts</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-40 bg-devops-bg border border-devops-border hover:border-neon-cyan rounded-lg p-3 backdrop-blur-sm transition-all group"
        title="Keyboard Shortcuts (?)"
      >
        <Keyboard className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors" />
      </button>

      {/* Shortcuts modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-devops-bg border border-neon-cyan rounded-lg p-8 max-w-3xl w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-neon-cyan transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <Keyboard className="w-6 h-6 text-neon-cyan" />
                <h2 className="text-2xl font-bold glow-text">Keyboard Shortcuts</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Vim-style Navigation */}
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-4 flex items-center gap-2">
                    <span className="text-2xl">⌨️</span> Vim-Style Navigation
                  </h3>
                  <div className="space-y-3 font-mono text-sm">
                    <ShortcutItem shortcut="j" description="Next section" />
                    <ShortcutItem shortcut="k" description="Previous section" />
                    <ShortcutItem shortcut="h" description="Go to Home" />
                    <ShortcutItem shortcut="l" description="Go to Next" />
                    <ShortcutItem shortcut="g g" description="Go to first section" />
                    <ShortcutItem shortcut="G" description="Go to last section" />
                  </div>
                </div>

                {/* Arrow Keys & Numbers */}
                <div>
                  <h3 className="text-lg font-semibold text-neon-cyan mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔢</span> Quick Navigation
                  </h3>
                  <div className="space-y-3 font-mono text-sm">
                    <ShortcutItem shortcut="↓" description="Next section" />
                    <ShortcutItem shortcut="↑" description="Previous section" />
                    <ShortcutItem shortcut="1" description="Go to Init" />
                    <ShortcutItem shortcut="2" description="Go to Build" />
                    <ShortcutItem shortcut="3" description="Go to Deploy" />
                    <ShortcutItem shortcut="4" description="Go to Run" />
                    <ShortcutItem shortcut="5" description="Go to Optimize" />
                  </div>
                </div>

                {/* Mouse Navigation */}
                <div className="md:col-span-2 pt-4 border-t border-devops-border">
                  <h3 className="text-lg font-semibold text-neon-cyan mb-4 flex items-center gap-2">
                    <span className="text-2xl">🖱️</span> Mouse Navigation
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• <strong className="text-neon-green">Scroll to bottom</strong> of current page, then continue scrolling to navigate to next section</p>
                    <p>• <strong className="text-neon-green">Scroll to top</strong> of current page, then continue scrolling to navigate to previous section</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-devops-border">
                <p className="text-sm text-gray-400 text-center">
                  Press <kbd className="px-2 py-1 bg-devops-border rounded mx-1 text-neon-cyan">?</kbd> anytime to toggle this help
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ShortcutItem({ shortcut, description }: { shortcut: string; description: string }) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-gray-300 group-hover:text-neon-cyan transition-colors">{description}</span>
      <kbd className="px-3 py-1.5 bg-devops-border rounded text-neon-green font-bold min-w-[3rem] text-center">
        {shortcut}
      </kbd>
    </div>
  )
}
