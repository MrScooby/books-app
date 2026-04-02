'use client'

import { useState, useEffect } from 'react'
import {
  TextField,
  Rating,
  Button,
  Alert,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Stack
} from '@mui/material'
import Link from 'next/link'
import { createBook } from '@/lib/api/books'
import { getShelves } from '@/lib/api/shelves'
import { ShelfListItem } from '@/lib/types'

export default function AddBookForm() {
  const [url, setUrl] = useState('')
  const [rating, setRating] = useState<number | null>(5)
  const [selectedShelves, setSelectedShelves] = useState<string[]>([])
  const [shelves, setShelves] = useState<ShelfListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getShelves({ perPage: 100 })
      .then((res) => setShelves(res.data))
      .catch(() => setError('Failed to load shelves'))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!url.trim()) {
      setError('URL is required')
      return
    }
    if (!rating || rating < 1) {
      setError('Rating is required')
      return
    }
    if (selectedShelves.length === 0) {
      setError('Select at least one shelf')
      return
    }

    setLoading(true)
    try {
      const bookId = await createBook({
        url: url.trim(),
        rating,
        shelves: selectedShelves
      })
      setSuccess(bookId)
      setUrl('')
      setRating(5)
      setSelectedShelves([])
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'Failed to add book'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={600}>
          Add Book
        </Typography>

        <TextField
          label="Book URL (lubimyczytac.pl)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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

        <FormControl fullWidth required>
          <InputLabel>Shelves</InputLabel>
          <Select
            multiple
            value={selectedShelves}
            onChange={(e) => setSelectedShelves(e.target.value as string[])}
            input={<OutlinedInput label="Shelves" />}
            disabled={loading}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((id) => (
                  <Chip
                    key={id}
                    label={shelves.find((s) => s.id === id)?.name ?? id}
                    size="small"
                  />
                ))}
              </Box>
            )}
          >
            {shelves.map((shelf) => (
              <MenuItem key={shelf.id} value={shelf.id}>
                {shelf.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Book'}
        </Button>

        {success && (
          <Alert severity="success">
            Book added.{' '}
            <Link href={`/books/${success}`}>View book</Link>
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Box>
  )
}
