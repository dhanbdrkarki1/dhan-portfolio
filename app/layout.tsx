import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { PipelineNavigator } from '@/components/navigation/PipelineNavigator'
import { ScrollController } from '@/components/navigation/ScrollController'
import { KeyboardHints } from '@/components/ui/KeyboardHints'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Dhan | DevOps Engineer',
    template: '%s | Dhan'
  },
  description: 'DevOps Engineer from Kathmandu, Nepal specializing in cloud infrastructure, Docker, Terraform, and CI/CD automation. Building scalable and efficient systems.',
  keywords: ['DevOps', 'AWS', 'Docker', 'Terraform', 'CI/CD', 'Cloud Engineer', 'Nepal', 'Kathmandu', 'Dhan Bahadur Karki'],
  authors: [{ name: 'Dhan Bahadur Karki' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Dhan Bahadur Karki | DevOps Engineer',
    description: 'Cloud infrastructure automation and CI/CD specialist from Kathmandu',
    siteName: 'Dhan Bahadur Karki Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="relative min-h-screen">
          {/* Scan line effect */}
          <div className="scan-line" />
          
          {/* Grid overlay */}
          <div className="grid-overlay" />
          
          {/* Pipeline Navigator */}
          <PipelineNavigator />
          
          {/* Scroll & Keyboard Navigation */}
          <ScrollController />
          <KeyboardHints />
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
