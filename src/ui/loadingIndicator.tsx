import { Box, CircularProgress } from '@mui/material'

export default function LoadingIndicator() {
  return (
    <Box
      sx={{
        margin: 'auto'
      }}
    >
      <CircularProgress />
    </Box>
  )
}
