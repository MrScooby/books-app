import MuiProvider from '@/components/layout/MuiProvider'
import AppShell from '@/components/layout/AppShell'

export const metadata = {
  title: 'My books',
  description: 'Personal book collection'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <MuiProvider>
          <AppShell>{children}</AppShell>
        </MuiProvider>
      </body>
    </html>
  )
}
