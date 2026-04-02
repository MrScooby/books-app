import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material'
import { MenuBook, AutoStories } from '@mui/icons-material'
import Link from 'next/link'

export default function ShelfCard({
  id,
  name,
  pages,
  bookCount
}: {
  id: string
  name: string
  pages: number
  bookCount: number
}) {
  return (
    <Card>
      <Link href={`/books?shelfId=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <CardActionArea>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AutoStories fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {bookCount} {bookCount === 1 ? 'book' : 'books'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MenuBook fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {pages.toLocaleString()} pages
            </Typography>
          </Box>
        </Box>
      </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  )
}
