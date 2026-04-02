import { Box, Typography, Chip, Rating, Stack, Card, CardMedia } from '@mui/material'
import { MenuBook, Person, Category, LibraryBooks } from '@mui/icons-material'
import Link from 'next/link'
import { getBook } from '@/lib/api/books'
import { getGenre } from '@/lib/api/genres'
import { getAuthor } from '@/lib/api/authors'
import { getShelves } from '@/lib/api/shelves'

export default async function BookDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const book = await getBook(id)

  const [genre, authors, shelvesData] = await Promise.all([
    book.genreId ? getGenre(book.genreId).catch(() => null) : null,
    Promise.all(book.authorsIds.map((aid) => getAuthor(aid).catch(() => null))),
    getShelves({ perPage: 100 })
  ])

  const authorItems = authors.filter(Boolean).map((a) => ({ id: a!.id, name: a!.name }))
  const shelfItems = shelvesData.data
    .filter((s) => book.shelvesIds.includes(s.id))
    .map((s) => ({ id: s.id, name: s.name }))

  return (
    <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
      <Card sx={{ flexShrink: 0, alignSelf: 'flex-start' }}>
        <CardMedia
          component="img"
          image={book.imgUrl || '/placeholder.svg'}
          alt={book.title}
          sx={{ width: { xs: '100%', md: 250 }, height: 'auto' }}
        />
      </Card>

      <Stack spacing={2} sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight={600}>
          {book.title}
        </Typography>

        {authorItems.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Person fontSize="small" color="action" />
            {authorItems.map((a, i) => (
              <span key={a.id}>
                <Link href={`/books?authorId=${a.id}`} style={{ color: 'inherit' }}>
                  {a.name}
                </Link>
                {i < authorItems.length - 1 && ', '}
              </span>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={book.rating} max={10} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            {book.rating}/10
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MenuBook fontSize="small" color="action" />
          <Typography color="text.secondary">{book.pages} pages</Typography>
        </Box>

        {genre && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Category fontSize="small" color="action" />
            <Link href={`/books?genreId=${book.genreId}`} style={{ color: 'inherit' }}>
              {genre.name}
            </Link>
          </Box>
        )}

        {shelfItems.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <LibraryBooks fontSize="small" color="action" />
            {shelfItems.map((s) => (
              <Link key={s.id} href={`/books?shelfId=${s.id}`} style={{ textDecoration: 'none' }}>
                <Chip label={s.name} size="small" variant="outlined" clickable />
              </Link>
            ))}
          </Box>
        )}

        {book.ISBN && (
          <Typography variant="body2" color="text.secondary">
            ISBN: {book.ISBN}
          </Typography>
        )}

        <Typography variant="body2">
          <Link href={book.url} target="_blank" rel="noopener noreferrer">
            View on lubimyczytac.pl
          </Link>
        </Typography>
      </Stack>
    </Box>
  )
}
