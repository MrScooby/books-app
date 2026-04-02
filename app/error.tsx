'use client'

import { Alert, Button, Box } from '@mui/material'

export default function GlobalError({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  const isConnectionError =
    error.message.includes('ECONNREFUSED') ||
    error.message.includes('fetch failed') ||
    error.message.includes('Network') ||
    error.message.includes('API error')

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
        {isConnectionError
          ? 'Unable to connect to the API. Please check if the backend is running.'
          : error.message || 'Something went wrong.'}
      </Alert>
    </Box>
  )
}
