/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // DevOps Dark Theme
        'devops-bg': '#0a0e27',
        'devops-surface': '#111827',
        'devops-border': '#1f2937',

        // Neon Accents
        'neon-cyan': '#00f5ff',
        'neon-blue': '#0ea5e9',
        'neon-green': '#10b981',
        'neon-purple': '#a855f7',
        'neon-yellow': '#fbbf24',

        // Status Colors
        'status-success': '#22c55e',
        'status-warning': '#f59e0b',
        'status-error': '#ef4444',
        'status-info': '#3b82f6',
      },
      fontFamily: {
        mono: [
          'var(--font-mono)',
          'Consolas',
          'Monaco',
          'Courier New',
          'monospace',
        ],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        scan: 'scan 8s linear infinite',
        'terminal-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow:
              '0 0 5px rgba(0, 245, 255, 0.5), 0 0 10px rgba(0, 245, 255, 0.3)',
          },
          '100%': {
            boxShadow:
              '0 0 10px rgba(0, 245, 255, 0.8), 0 0 20px rgba(0, 245, 255, 0.5)',
          },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at center, rgba(0, 245, 255, 0.1) 0%, transparent 70%)',
      },
      backgroundSize: {
        grid: '50px 50px',
      },
    },
  },
  plugins: [],
};
