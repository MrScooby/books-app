import * as React from 'react'
import { Box, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export default function header({
  open,
  setOpen
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'lightgrey'
      }}
    >
      {/* TODO: move close icon to drawer - it will work much better on mobiles */}
      <IconButton
        onClick={() => setOpen(false)}
        disableRipple={true}
        sx={{
          height: '65px',
          width: '65px',
          visibility: 'hidden',
          opacity: 0,
          transition: 'visibility 0.3s ease ,opacity 0.3s ease',
          ...(open && {
            visibility: 'visible',
            opacity: 1
          })
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={() => setOpen(false)}
        disableRipple={true}
        sx={{
          height: '65px',
          width: '65px',
          fontSize: 'large'
        }}
      >
        <AccountBoxIcon />
      </IconButton>
    </Box>
  )
}
