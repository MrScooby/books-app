import { Grid, Typography } from '@mui/material'
import BookCard from './BookCard'
import { BookListItem } from '@/lib/types'

export default function BookGrid({ books }: { books: BookListItem[] }) {
  if (books.length === 0) {
    return <Typography color="text.secondary">No books found.</Typography>
  }

  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid key={book.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  )
}
