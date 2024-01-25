import type { Metadata } from 'next'

import Header from './components/header'
import Footer from './components/footer'

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
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
