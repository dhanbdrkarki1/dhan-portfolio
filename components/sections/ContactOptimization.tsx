'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, FileText, Terminal, Send } from 'lucide-react'
import { useState } from 'react'

export function ContactOptimization() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'configuring' | 'deployed'>('idle')
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('configuring')
    setTerminalOutput([])

    const deploymentSteps = [
      'Initializing configuration...',
      `Setting up connection for ${formData.name}...`,
      `Validating email: ${formData.email}...`,
      'Checking deployment requirements...',
      'Running pre-deployment tests...',
      'All checks passed ✓',
      'Deploying configuration to production...',
      'Configuration deployed successfully! ✓',
      `Message received from ${formData.company || 'user'}`,
      'System ready for optimization.',
    ]

    for (let i = 0; i < deploymentSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400))
      setTerminalOutput(prev => [...prev, deploymentSteps[i]])
    }

    setTimeout(() => {
      setStatus('deployed')
    }, 500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="glow-text">System</span> Optimization
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to optimize your infrastructure? Let's discuss how we can scale your systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-devops">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-devops-border">
                <Terminal className="w-5 h-5 text-neon-cyan" />
                <h2 className="text-xl font-bold font-mono">CONFIG_UPDATE.yml</h2>
              </div>

              {status === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      name: <span className="text-status-error">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      email: <span className="text-status-error">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      company:
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">
                      message: <span className="text-status-error">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-devops-bg border border-devops-border rounded-lg px-4 py-3 text-gray-200 focus:border-neon-cyan focus:outline-none transition-colors font-mono resize-none"
                      placeholder="Describe your infrastructure needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Deploy Configuration
                  </button>
                </form>
              )}

              {(status === 'configuring' || status === 'deployed') && (
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
                  
                  {status === 'configuring' && (
                    <motion.div
                      className="flex items-center gap-2 text-neon-cyan mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span>$</span>
                      <span className="animate-terminal-blink">_</span>
                    </motion.div>
                  )}

                  {status === 'deployed' && (
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
                        onClick={() => {
                          setStatus('idle')
                          setTerminalOutput([])
                          setFormData({ name: '', email: '', company: '', message: '' })
                        }}
                        className="mt-4 px-4 py-2 bg-devops-bg border border-status-success text-status-success rounded-lg text-sm hover:bg-status-success hover:bg-opacity-10 transition-all"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Contact Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Contact */}
            <div className="card-devops">
              <h3 className="text-xl font-bold mb-4">Quick Connect</h3>
              <div className="space-y-3">
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-3 p-3 bg-devops-bg hover:bg-neon-cyan hover:bg-opacity-10 border border-devops-border hover:border-neon-cyan rounded-lg transition-all group"
                >
                  <Mail className="w-5 h-5 text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="font-mono text-sm group-hover:text-neon-cyan transition-colors">
                      your.email@example.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-devops-bg hover:bg-neon-cyan hover:bg-opacity-10 border border-devops-border hover:border-neon-cyan rounded-lg transition-all group"
                >
                  <Linkedin className="w-5 h-5 text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">LinkedIn</div>
                    <div className="font-mono text-sm group-hover:text-neon-cyan transition-colors">
                      /in/yourprofile
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-devops-bg hover:bg-neon-cyan hover:bg-opacity-10 border border-devops-border hover:border-neon-cyan rounded-lg transition-all group"
                >
                  <Github className="w-5 h-5 text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">GitHub</div>
                    <div className="font-mono text-sm group-hover:text-neon-cyan transition-colors">
                      @yourusername
                    </div>
                  </div>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-3 p-3 bg-devops-bg hover:bg-neon-cyan hover:bg-opacity-10 border border-devops-border hover:border-neon-cyan rounded-lg transition-all group"
                >
                  <FileText className="w-5 h-5 text-neon-cyan" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-400">Resume</div>
                    <div className="font-mono text-sm group-hover:text-neon-cyan transition-colors">
                      Download PDF
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="card-devops">
              <h3 className="text-xl font-bold mb-4">What I Offer</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">✓</span>
                  <span>Cloud infrastructure design and optimization (AWS, Azure)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">✓</span>
                  <span>Kubernetes deployment and management (EKS, AKS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">✓</span>
                  <span>CI/CD pipeline automation and optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">✓</span>
                  <span>Infrastructure as Code (Terraform, CloudFormation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">✓</span>
                  <span>Cost optimization and cloud spend management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">✓</span>
                  <span>Security hardening and compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">✓</span>
                  <span>Monitoring and observability setup</span>
                </li>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
