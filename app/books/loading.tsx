import { Grid, Skeleton } from '@mui/material'

export default function BooksLoading() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Grid key={i} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <Skeleton variant="rounded" height={320} />
        </Grid>
      ))}
    </Grid>
  )
}
