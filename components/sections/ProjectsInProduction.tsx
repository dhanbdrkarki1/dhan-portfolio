'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { resumeData } from '@/data/resume'

const projects = resumeData.projects

const statusColors = {
  running: 'text-status-success border-status-success',
  deployed: 'text-neon-cyan border-neon-cyan',
  staging: 'text-status-warning border-status-warning',
}

export function ProjectsInProduction() {
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
            <span className="glow-text">Portfolio</span> Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Personal projects demonstrating DevOps practices and automation skills
          </p>
        </motion.div>

        {/* System Status Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4 mb-12"
        >
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-green font-mono mb-2">
              {projects.length}
            </div>
            <div className="text-sm text-gray-400 uppercase">Active Projects</div>
          </div>
          
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-cyan font-mono mb-2">
              10+
            </div>
            <div className="text-sm text-gray-400 uppercase">Technologies</div>
          </div>
          
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-cyan font-mono mb-2">
              {resumeData.personal.stats.find(s => s.id === 'repos')?.value || projects.length}
            </div>
            <div className="text-sm text-gray-400 uppercase">GitHub Repos</div>
          </div>
          
          <div className="card-devops text-center">
            <div className="text-3xl font-bold text-neon-green font-mono mb-2">
              2.5
            </div>
            <div className="text-sm text-gray-400 uppercase">Years Exp</div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card-devops group"
            >
              {/* Status Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${statusColors[project.status].replace('text-', 'bg-')} animate-pulse`} />
                  <span className={`text-xs font-mono uppercase ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="text-xs text-gray-400 font-mono">
                  Uptime: {project.uptime}%
                </div>
              </div>

              {/* Project Info */}
              <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">
                {project.name}
              </h3>
              
              <p className="text-gray-400 mb-4 text-sm">
                {project.description}
              </p>

              {/* Architecture */}
              <div className="mb-4 p-3 bg-devops-bg rounded-lg border border-devops-border">
                <div className="text-xs text-gray-500 uppercase mb-1">Architecture</div>
                <div className="text-sm font-mono text-neon-cyan">
                  {project.architecture}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="text-xs text-gray-400 uppercase mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-devops-bg rounded text-xs text-gray-300 border border-devops-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {project.metrics.map((metric, idx) => {
                  const Icon = metric.icon
                  return (
                    <div
                      key={idx}
                      className="text-center p-2 bg-devops-bg rounded border border-devops-border"
                    >
                      <Icon className="w-4 h-4 text-neon-cyan mx-auto mb-1" />
                      <div className="text-sm font-bold text-gray-200 font-mono">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500">{metric.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-devops-border">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-devops-bg hover:bg-neon-cyan hover:bg-opacity-10 border border-neon-cyan rounded-lg text-sm transition-all duration-300 flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                )}
                
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-neon-cyan hover:bg-neon-blue text-devops-bg rounded-lg text-sm transition-all duration-300 flex-1 justify-center font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
