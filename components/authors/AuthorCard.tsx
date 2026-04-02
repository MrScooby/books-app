import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material'
import { AutoStories } from '@mui/icons-material'
import Link from 'next/link'

export default function AuthorCard({
  id,
  name,
  bookCount
}: {
  id: string
  name: string
  bookCount: number
}) {
  return (
    <Card>
      <Link href={`/books?authorId=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <CardActionArea>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AutoStories fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {bookCount} {bookCount === 1 ? 'book' : 'books'}
          </Typography>
        </Box>
      </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  )
}
