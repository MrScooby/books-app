'use client'

import { Alert, Button, Box } from '@mui/material'
import Link from 'next/link'

export default function BookDetailError({
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
        Failed to load book details. {error.message.includes('404')
          ? 'Book not found.'
          : error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')
            ? 'The API server appears to be down.'
            : error.message}
      </Alert>
      <Box sx={{ mt: 2 }}>
        <Link href="/books">Back to books</Link>
      </Box>
    </Box>
  )
}
