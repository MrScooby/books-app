'use client'

import { useState } from 'react'
import { AppBar, Toolbar, Button, Box, Container, IconButton, Tooltip } from '@mui/material'
import { AutoStories, Shelves, Person, Category, AddCircleOutline, VpnKey } from '@mui/icons-material'
import { useRouter, usePathname } from 'next/navigation'
import AdminTokenDialog from './AdminTokenDialog'

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
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false)

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar variant="dense">
          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'nowrap', flex: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => router.push(item.href)}
                startIcon={item.icon}
                variant={pathname.startsWith(item.href) ? 'contained' : 'text'}
                size="small"
                disableElevation
                aria-label={item.label}
                sx={{
                  minWidth: { xs: 0, sm: 64 },
                  px: { xs: 1, sm: 1.5 },
                  '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } }
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {item.label}
                </Box>
              </Button>
            ))}
          </Box>
          <Tooltip title="Admin token">
            <IconButton
              size="small"
              onClick={() => setTokenDialogOpen(true)}
              aria-label="Admin token"
            >
              <VpnKey fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <AdminTokenDialog
        open={tokenDialogOpen}
        onClose={() => setTokenDialogOpen(false)}
      />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </>
  )
}
