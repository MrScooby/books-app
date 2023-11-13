import * as React from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DrawerList from './drawerList'

export default function Drawer({
  open,
  setOpen
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  return (
    <MuiDrawer
      variant="permanent"
      open={open}
      sx={{
        width: '240px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: 'width 0.3s ease',
        backgroundColor: 'lightgray',
        ...(!open && {
          width: '65px'
        }),
        '& .MuiDrawer-paper': {
          transition: 'width 0.3s ease',
          backgroundColor: 'lightgray',
          width: '240px',
          ...(!open && {
            width: '65px'
          })
        }
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <IconButton
          onClick={() => setOpen(true)}
          disableRipple={true}
          sx={{
            height: '65px',
            width: '65px',
            visibility: 'visible',
            opacity: 1,
            transition: 'visibility 0.3s ease ,opacity 0.3s ease',
            ...(open && {
              visibility: 'hidden',
              opacity: 0
            })
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <DrawerList open={open} />
    </MuiDrawer>
  )
}
