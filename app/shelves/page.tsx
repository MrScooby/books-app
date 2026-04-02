export const dynamic = 'force-dynamic'

import { Grid, Typography } from '@mui/material'
import ShelfCard from '@/components/shelves/ShelfCard'
import { getShelves } from '@/lib/api/shelves'

export default async function ShelvesPage() {
  const shelves = await getShelves({ perPage: 100 })

  if (shelves.data.length === 0) {
    return <Typography color="text.secondary">No shelves found.</Typography>
  }

  return (
    <>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Shelves
      </Typography>
      <Grid container spacing={2}>
        {shelves.data.map((shelf: any) => (
          <Grid key={shelf.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ShelfCard
              id={shelf.id}
              name={shelf.name}
              pages={shelf.pages}
              bookCount={shelf.bookCount ?? 0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
