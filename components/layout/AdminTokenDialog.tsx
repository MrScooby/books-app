'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Stack
} from '@mui/material'
import { ADMIN_TOKEN_KEY } from '@/lib/api/client'

export default function AdminTokenDialog({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  const [value, setValue] = useState('')
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    if (!open) return
    const existing = window.localStorage.getItem(ADMIN_TOKEN_KEY) ?? ''
    setValue(existing)
    setHasToken(Boolean(existing))
  }, [open])

  const save = () => {
    const trimmed = value.trim()
    if (trimmed) {
      window.localStorage.setItem(ADMIN_TOKEN_KEY, trimmed)
    } else {
      window.localStorage.removeItem(ADMIN_TOKEN_KEY)
    }
    onClose()
  }

  const clear = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY)
    setValue('')
    setHasToken(false)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Admin token</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Required for adding, editing, and deleting books. Stored in your browser.
          </Typography>
          <TextField
            label="Token"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            fullWidth
          />
          {hasToken && (
            <Typography variant="caption" color="success.main">
              A token is currently set.
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {hasToken && (
          <Button onClick={clear} color="error">
            Clear
          </Button>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={save} variant="contained" disableElevation>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
