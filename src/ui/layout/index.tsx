'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from './drawer'
import Header from './header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Header open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
