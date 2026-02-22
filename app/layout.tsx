import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: 'Silk Racing AI',
  description: 'AI Chatbot for Silk Racing',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2a3a4a' },
    { media: '(prefers-color-scheme: dark)', color: '#1a2a3a' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${_notoSansJP.variable} ${_geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
