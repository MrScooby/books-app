'use client'

import { AppBar, Toolbar, Button, Box, Container } from '@mui/material'
import { AutoStories, Shelves, Person, Category, AddCircleOutline } from '@mui/icons-material'
import { useRouter, usePathname } from 'next/navigation'

const navItems = [
  { label: 'Books', href: '/books', icon: <AutoStories fontSize="small" /> },
  { label: 'Shelves', href: '/shelves', icon: <Shelves fontSize="small" /> },
  { label: 'Authors', href: '/authors', icon: <Person fontSize="small" /> },
  { label: 'Genres', href: '/genres', icon: <Category fontSize="small" /> },
  { label: 'Add Book', href: '/add', icon: <AddCircleOutline fontSize="small" /> }
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense">
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => router.push(item.href)}
                startIcon={item.icon}
                variant={pathname.startsWith(item.href) ? 'contained' : 'text'}
                size="small"
                disableElevation
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </>
  )
}
