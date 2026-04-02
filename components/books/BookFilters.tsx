'use client'

import { useState, useEffect } from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material'
import { Clear } from '@mui/icons-material'
import { useRouter, useSearchParams } from 'next/navigation'
import { getShelves } from '@/lib/api/shelves'
import { getAuthors } from '@/lib/api/authors'
import { getGenres } from '@/lib/api/genres'
import { ShelfListItem, AuthorListItem, GenreListItem } from '@/lib/types'

export default function BookFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const shelfId = searchParams.get('shelfId') ?? ''
  const authorId = searchParams.get('authorId') ?? ''
  const genreId = searchParams.get('genreId') ?? ''

  const [shelves, setShelves] = useState<ShelfListItem[]>([])
  const [authors, setAuthors] = useState<AuthorListItem[]>([])
  const [genres, setGenres] = useState<GenreListItem[]>([])

  useEffect(() => {
    getShelves({ perPage: 100 }).then((res) => setShelves(res.data))
    getAuthors({ perPage: 100 }).then((res) => setAuthors(res.data))
    getGenres({ perPage: 100 }).then((res) => setGenres(res.data))
  }, [])

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set('page', '1')
    router.push(`/books?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    const perPage = searchParams.get('perPage')
    if (perPage) params.set('perPage', perPage)
    router.push(`/books?${params.toString()}`)
  }

  const hasFilters = shelfId || authorId || genreId

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Shelf</InputLabel>
        <Select
          value={shelfId}
          label="Shelf"
          onChange={(e) => updateFilter('shelfId', e.target.value)}
        >
          <MenuItem value="">All shelves</MenuItem>
          {shelves.map((s) => (
            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Author</InputLabel>
        <Select
          value={authorId}
          label="Author"
          onChange={(e) => updateFilter('authorId', e.target.value)}
        >
          <MenuItem value="">All authors</MenuItem>
          {authors.map((a) => (
            <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={genreId}
          label="Genre"
          onChange={(e) => updateFilter('genreId', e.target.value)}
        >
          <MenuItem value="">All genres</MenuItem>
          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {hasFilters && (
        <IconButton size="small" onClick={clearFilters} title="Clear filters">
          <Clear fontSize="small" />
        </IconButton>
      )}
    </Box>
  )
}
