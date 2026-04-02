'use client'

import { Alert, Button, Box } from '@mui/material'

export default function ShelvesError({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  return (
    <Box sx={{ py: 4 }}>
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={reset}>
            Retry
          </Button>
        }
      >
        Failed to load shelves. {error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')
          ? 'The API server appears to be down.'
          : error.message}
      </Alert>
    </Box>
  )
}
