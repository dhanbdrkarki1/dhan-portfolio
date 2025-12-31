'use client'

import { useState, useEffect } from 'react'
import { Keyboard, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function KeyboardHints() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev)
    window.addEventListener('toggle-keyboard-hints', handleToggle)
    return () => window.removeEventListener('toggle-keyboard-hints', handleToggle)
  }, [])

  return (
    <>
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
