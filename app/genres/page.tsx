import { Grid, Typography } from '@mui/material'
import GenreCard from '@/components/genres/GenreCard'
import { getGenres } from '@/lib/api/genres'
import { getBooks } from '@/lib/api/books'

export default async function GenresPage() {
  const genres = await getGenres({ perPage: 100 })

  const genresWithCounts = await Promise.all(
    genres.data.map(async (genre) => {
      const books = await getBooks({ genreId: genre.id, perPage: 1 }).catch(() => null)
      return {
        id: genre.id,
        name: genre.name,
        bookCount: books?.meta.total ?? 0
      }
    })
  )

  if (genresWithCounts.length === 0) {
    return <Typography color="text.secondary">No genres found.</Typography>
  }

  return (
    <>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Genres
      </Typography>
      <Grid container spacing={2}>
        {genresWithCounts.map((genre) => (
          <Grid key={genre.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <GenreCard
              id={genre.id}
              name={genre.name}
              bookCount={genre.bookCount}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
