import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { PipelineNavigator } from '@/components/navigation/PipelineNavigator'

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
  title: 'DevOps Engineer Portfolio | Cloud Infrastructure & CI/CD Automation',
  description: 'AWS-Certified DevOps Engineer specializing in cloud infrastructure, Kubernetes, Terraform, CI/CD pipelines, and cost optimization. Experience with AWS, Azure, Docker, EKS, GitHub Actions.',
  keywords: ['DevOps', 'AWS', 'Azure', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker', 'Cloud Engineer', 'Infrastructure as Code', 'Site Reliability'],
  authors: [{ name: 'DevOps Engineer' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'DevOps Engineer Portfolio',
    description: 'Cloud infrastructure automation and CI/CD pipeline expert',
    siteName: 'DevOps Portfolio',
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
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
