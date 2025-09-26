import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Telegram Multi-Function Bot Dashboard',
  description: 'Dashboard untuk mengelola bot Telegram multi-fungsi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
