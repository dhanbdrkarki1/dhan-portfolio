'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, FileText, Terminal, Send } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { resumeData } from '@/data/resume'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const { personal, services } = resumeData

export function ContactOptimization() {
  const [state, handleSubmit] = useForm("xvzgplgg")
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Animate terminal output when form is submitting
  useEffect(() => {
    if (state.submitting && formData.name) {
      setIsAnimating(true)
      setTerminalOutput([])
      const deploymentSteps = [
        'Initializing configuration...',
        `Setting up connection for ${formData.name}...`,
        `Validating email: ${formData.email}...`,
        'Checking deployment requirements...',
        'Running pre-deployment tests...',
        'All checks passed ✓',
        'Deploying configuration to production...',
        'Sending message to server...',
      ]

      deploymentSteps.forEach((step, index) => {
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, step])
          if (index === deploymentSteps.length - 1) {
            setIsAnimating(false)
          }
        }, index * 300)
      })
    }
  }, [state.submitting, formData])

  // Show success message when form submission succeeds
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccessMessage(true)
    }
  }, [state.succeeded])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget
    const data = new FormData(form)
    setFormData({
      name: data.get('name') as string,
      email: data.get('email') as string,
    })
    handleSubmit(e)
  }

  const handleReset = () => {
    // Reset all states
    setTerminalOutput([])
    setFormData({ name: '', email: '' })
    setIsAnimating(false)
    setShowSuccessMessage(false)
    
    // Reset form fields
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="up" duration={0.6}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="glow-text">System</span> Optimization
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to optimize your infrastructure? Let's discuss how we can scale your systems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <ScrollReveal direction="left" delay={0.2} duration={0.7}>
            <div className="card-devops">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-devops-border">
                <Terminal className="w-5 h-5 text-neon-cyan" />
                <h2 className="text-xl font-bold font-mono">CONFIG_UPDATE.yml</h2>
              </div>

              {!showSuccessMessage && !isAnimating && (
                <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      name: <span className="text-status-error">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={state.submitting}
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono disabled:opacity-50"
                      placeholder="John Doe"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      email: <span className="text-status-error">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={state.submitting}
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono disabled:opacity-50"
                      placeholder="john@company.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      company:
                    </label>
                    <input
                      type="text"
                      name="company"
                      disabled={state.submitting}
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono disabled:opacity-50"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      message: <span className="text-status-error">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      disabled={state.submitting}
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono resize-none disabled:opacity-50"
                      placeholder="Describe your infrastructure needs..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {state.submitting ? 'Deploying...' : 'Deploy Configuration'}
                  </button>
                </form>
              )}

              {(isAnimating || showSuccessMessage) && (
                <div className="font-mono text-sm space-y-1">
                  {terminalOutput.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${
                        line.includes('✓') ? 'text-status-success' : 
                        line.includes('error') ? 'text-status-error' : 
                        'text-neon-cyan'
                      }`}
                    >
                      {line.includes('✓') ? '✓' : '›'} {line}
                    </motion.div>
                  ))}
                  
                  {isAnimating && !showSuccessMessage && (
                    <motion.div
                      className="flex items-center gap-2 text-neon-cyan mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span>$</span>
                      <span className="animate-terminal-blink">_</span>
                    </motion.div>
                  )}

                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-status-success bg-opacity-10 border border-status-success rounded-lg"
                    >
                      <p className="text-status-success font-bold mb-2">
                        ✓ Configuration Deployed Successfully
                      </p>
                      <p className="text-gray-300 text-sm">
                        Your message has been received. I'll get back to you within 24 hours to discuss optimization strategies.
                      </p>
                      <button
                        onClick={handleReset}
                        className="mt-4 px-4 py-2 bg-neon-cyan text-devops-bg rounded-lg hover:bg-neon-blue transition-colors font-mono text-sm"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Right: Contact Info & Links */}
          <ScrollReveal direction="right" delay={0.3} duration={0.7}>
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="card-devops">
                <h3 className="text-xl font-bold mb-4">Quick Connect</h3>
                <div className="space-y-3">
                {personal.socialLinks.map((link) => {
                  const IconComponent = 
                    link.icon === 'mail' ? Mail :
                    link.icon === 'linkedin' ? Linkedin :
                    link.icon === 'github' ? Github :
                    link.icon === 'medium' ? FileText :
                    link.icon === 'resume' ? FileText :
                    FileText

                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 p-3 bg-devops-bg hover:bg-neon-cyan hover:bg-opacity-10 border border-devops-border hover:border-neon-cyan rounded-lg transition-all group"
                    >
                      <IconComponent className="w-5 h-5 text-neon-cyan" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-400">{link.label}</div>
                        <div className="font-mono text-sm group-hover:text-neon-cyan transition-colors">
                          {link.displayText || link.url}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Services */}
            <div className="card-devops">
              <h3 className="text-xl font-bold mb-4">What I Offer</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {services.map((service) => (
                  <li key={service.id} className="flex items-start gap-2">
                    <span className="text-neon-green mt-1">✓</span>
                    <span>{service.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div className="card-devops">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-status-success animate-pulse" />
                <h3 className="text-xl font-bold">Currently Available</h3>
              </div>
              <p className="text-sm text-gray-400">
                Open to consulting opportunities, contract work, and full-time positions. 
                Response time: <span className="text-neon-cyan font-mono">{"<"} 24 hours</span>
              </p>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
