import { Grid, Typography } from '@mui/material'
import ShelfCard from '@/components/shelves/ShelfCard'
import { getShelves, getShelf } from '@/lib/api/shelves'

export default async function ShelvesPage() {
  const shelves = await getShelves({ perPage: 100 })

  const shelvesWithCounts = await Promise.all(
    shelves.data.map(async (shelf) => {
      const detail = await getShelf(shelf.id).catch(() => null)
      return {
        id: shelf.id,
        name: shelf.name,
        pages: shelf.pages,
        bookCount: detail?.books.length ?? 0
      }
    })
  )

  if (shelvesWithCounts.length === 0) {
    return <Typography color="text.secondary">No shelves found.</Typography>
  }

  return (
    <>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Shelves
      </Typography>
      <Grid container spacing={2}>
        {shelvesWithCounts.map((shelf) => (
          <Grid key={shelf.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ShelfCard
              id={shelf.id}
              name={shelf.name}
              pages={shelf.pages}
              bookCount={shelf.bookCount}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
