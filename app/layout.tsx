import Layout from '@/src/ui/layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My books'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
