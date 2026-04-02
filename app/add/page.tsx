import { Alert, Typography, Box } from '@mui/material'

export default function AddPage() {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Add Book
      </Typography>
      <Alert severity="info">
        Adding new books is temporarily disabled.
      </Alert>
    </Box>
  )
}
