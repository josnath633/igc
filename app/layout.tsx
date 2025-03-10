import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IGC_Centre d\'Excellence',
  description: 'Created with Next.js',
  generator: 'JosNath',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
