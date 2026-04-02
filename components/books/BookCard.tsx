import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import { BookListItem } from '@/lib/types'

export default function BookCard({ book }: { book: BookListItem }) {
  return (
    <Link href={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ height: '100%' }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            image={book.imgUrl || '/placeholder.svg'}
            alt={book.title}
            sx={{ height: 280, objectFit: 'cover' }}
          />
          <CardContent sx={{ p: 1.5 }}>
            <Typography variant="body2" noWrap title={book.title}>
              {book.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
