export const dynamic = 'force-dynamic'

import { Grid, Typography } from '@mui/material'
import GenreCard from '@/components/genres/GenreCard'
import { getGenres } from '@/lib/api/genres'

export default async function GenresPage() {
  const genres = await getGenres({ perPage: 100 })

  if (genres.data.length === 0) {
    return <Typography color="text.secondary">No genres found.</Typography>
  }

  return (
    <>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Genres
      </Typography>
      <Grid container spacing={2}>
        {genres.data.map((genre: any) => (
          <Grid key={genre.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <GenreCard
              id={genre.id}
              name={genre.name}
              bookCount={genre.bookCount ?? 0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
