import { Grid, Typography } from '@mui/material'
import AuthorCard from '@/components/authors/AuthorCard'
import { getAuthors, getAuthor } from '@/lib/api/authors'

export default async function AuthorsPage() {
  const authors = await getAuthors({ perPage: 100 })

  const authorsWithCounts = await Promise.all(
    authors.data.map(async (author) => {
      const detail = await getAuthor(author.id).catch(() => null)
      return {
        id: author.id,
        name: author.name,
        bookCount: detail?.bookIds.length ?? 0
      }
    })
  )

  if (authorsWithCounts.length === 0) {
    return <Typography color="text.secondary">No authors found.</Typography>
  }

  return (
    <>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Authors
      </Typography>
      <Grid container spacing={2}>
        {authorsWithCounts.map((author) => (
          <Grid key={author.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <AuthorCard
              id={author.id}
              name={author.name}
              bookCount={author.bookCount}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
