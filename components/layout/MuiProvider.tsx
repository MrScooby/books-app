'use client'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import EmotionRegistry from './EmotionRegistry'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#455a64' },
    background: { default: '#fafafa' }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCard: {
      defaultProps: { variant: 'outlined' }
    }
  }
})

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionRegistry>
  )
}
