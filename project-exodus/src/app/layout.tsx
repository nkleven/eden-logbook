import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nate & Kelly | Our Wedding',
  description: 'Join us as we celebrate our love and begin our journey together.',
  openGraph: {
    title: 'Nate & Kelly | Our Wedding',
    description: 'Join us as we celebrate our love and begin our journey together.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
