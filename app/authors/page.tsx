export const dynamic = 'force-dynamic'

import { Grid, Typography } from '@mui/material'
import AuthorCard from '@/components/authors/AuthorCard'
import { getAuthors } from '@/lib/api/authors'

export default async function AuthorsPage() {
  const authors = await getAuthors({ perPage: 100 })

  if (authors.data.length === 0) {
    return <Typography color="text.secondary">No authors found.</Typography>
  }

  return (
    <>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Authors
      </Typography>
      <Grid container spacing={2}>
        {authors.data.map((author: any) => (
          <Grid key={author.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <AuthorCard
              id={author.id}
              name={author.name}
              bookCount={author.bookCount ?? 0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
