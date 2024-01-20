import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import Header from './(pages)/components/header'
import Footer from './(pages)/components/footer'

import './globals.css'

export const metadata: Metadata = {
  title: 'Antico Granaio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
