'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Stack,
  Alert
} from '@mui/material'
import { Edit, LibraryAdd, SwapHoriz } from '@mui/icons-material'
import {
  updateBook,
  addBookToShelf,
  replaceBookEdition,
  BookFullDetail
} from '@/lib/api/books'
import { UpdateBookPayload } from '@/lib/types'

interface Option {
  id: string
  name: string
}

export default function BookAdminActions({
  book,
  genres,
  authors,
  shelves
}: {
  book: BookFullDetail
  genres: Option[]
  authors: Option[]
  shelves: Option[]
}) {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)
  const [shelfOpen, setShelfOpen] = useState(false)
  const [replaceOpen, setReplaceOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Button
        size="small"
        variant="outlined"
        startIcon={<Edit fontSize="small" />}
        onClick={() => setEditOpen(true)}
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="outlined"
        startIcon={<LibraryAdd fontSize="small" />}
        onClick={() => setShelfOpen(true)}
      >
        Add to shelf
      </Button>
      <Button
        size="small"
        variant="outlined"
        startIcon={<SwapHoriz fontSize="small" />}
        onClick={() => setReplaceOpen(true)}
      >
        Replace edition
      </Button>

      <EditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        book={book}
        genres={genres}
        authors={authors}
        onSaved={() => {
          setEditOpen(false)
          router.refresh()
        }}
      />

      <AddToShelfDialog
        open={shelfOpen}
        onClose={() => setShelfOpen(false)}
        bookId={book.id}
        shelves={shelves}
        currentShelfIds={book.shelves.map((s) => s.id)}
        onSaved={() => {
          setShelfOpen(false)
          router.refresh()
        }}
      />

      <ReplaceEditionDialog
        open={replaceOpen}
        onClose={() => setReplaceOpen(false)}
        bookId={book.id}
        onSaved={() => {
          setReplaceOpen(false)
          router.refresh()
        }}
      />
    </Box>
  )
}

function EditDialog({
  open,
  onClose,
  book,
  genres,
  authors,
  onSaved
}: {
  open: boolean
  onClose: () => void
  book: BookFullDetail
  genres: Option[]
  authors: Option[]
  onSaved: () => void
}) {
  const [title, setTitle] = useState(book.title)
  const [rating, setRating] = useState<number | null>(book.rating)
  const [pages, setPages] = useState(String(book.pages))
  const [isbn, setIsbn] = useState(book.ISBN ?? '')
  const [url, setUrl] = useState(book.url)
  const [imgUrl, setImgUrl] = useState(book.imgUrl)
  const [genreId, setGenreId] = useState(book.genre?.id ?? '')
  const [authorIds, setAuthorIds] = useState<string[]>(book.authors.map((a) => a.id))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    setError(null)

    if (!title.trim()) {
      setError('Title is required')
      return
    }
    const pagesNum = Number(pages)
    if (!pagesNum || pagesNum < 1) {
      setError('Pages must be a positive number')
      return
    }
    if (!rating || rating < 1) {
      setError('Rating is required')
      return
    }

    const payload: UpdateBookPayload = {
      title: title.trim(),
      rating,
      pages: pagesNum,
      url: url.trim(),
      imgUrl: imgUrl.trim(),
      ISBN: isbn.trim() || undefined,
      genreId: genreId || undefined,
      authorIds
    }

    setLoading(true)
    try {
      await updateBook(book.id, payload)
      onSaved()
    } catch (err: any) {
      setError(err.message || 'Failed to update book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit book</DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 0.5 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Rating
            </Typography>
            <Rating
              value={rating}
              max={10}
              onChange={(_, value) => setRating(value)}
              disabled={loading}
            />
          </Box>

          <TextField
            label="Pages"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            fullWidth
            disabled={loading}
          />

          <TextField
            label="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            fullWidth
            disabled={loading}
          />

          <TextField
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            disabled={loading}
          />

          <TextField
            label="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            fullWidth
            disabled={loading}
          />

          <FormControl fullWidth disabled={loading}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={genreId}
              label="Genre"
              onChange={(e) => setGenreId(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth disabled={loading}>
            <InputLabel>Authors</InputLabel>
            <Select
              multiple
              value={authorIds}
              onChange={(e) => setAuthorIds(e.target.value as string[])}
              input={<OutlinedInput label="Authors" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((id) => (
                    <Chip
                      key={id}
                      label={authors.find((a) => a.id === id)?.name ?? id}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            >
              {authors.map((a) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disableElevation disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function AddToShelfDialog({
  open,
  onClose,
  bookId,
  shelves,
  currentShelfIds,
  onSaved
}: {
  open: boolean
  onClose: () => void
  bookId: string
  shelves: Option[]
  currentShelfIds: string[]
  onSaved: () => void
}) {
  const [shelfName, setShelfName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const available = shelves.filter((s) => !currentShelfIds.includes(s.id))

  const handleSave = async () => {
    setError(null)
    if (!shelfName) {
      setError('Select a shelf')
      return
    }

    setLoading(true)
    try {
      await addBookToShelf(bookId, shelfName)
      setShelfName('')
      onSaved()
    } catch (err: any) {
      setError(err.message || 'Failed to add book to shelf')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add to shelf</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          {available.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              This book is already on every shelf.
            </Typography>
          ) : (
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Shelf</InputLabel>
              <Select
                value={shelfName}
                label="Shelf"
                onChange={(e) => setShelfName(e.target.value)}
              >
                {available.map((s) => (
                  <MenuItem key={s.id} value={s.name}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disableElevation
          disabled={loading || available.length === 0}
        >
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function ReplaceEditionDialog({
  open,
  onClose,
  bookId,
  onSaved
}: {
  open: boolean
  onClose: () => void
  bookId: string
  onSaved: () => void
}) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    setError(null)
    if (!url.trim()) {
      setError('URL is required')
      return
    }

    setLoading(true)
    try {
      await replaceBookEdition(bookId, url.trim())
      setUrl('')
      onSaved()
    } catch (err: any) {
      setError(err.message || 'Failed to replace edition')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Replace edition</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 0.5 }}>
          <Alert severity="warning">
            This overwrites the title, authors, genre, page count, ISBN and cover
            with data scraped from the new URL. Shelves and your rating stay
            unchanged.
          </Alert>

          <TextField
            label="New book URL (lubimyczytac.pl)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disableElevation
          disabled={loading}
        >
          {loading ? 'Replacing...' : 'Replace'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
