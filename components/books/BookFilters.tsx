'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material'
import { Clear, Search } from '@mui/icons-material'
import { useRouter, useSearchParams } from 'next/navigation'

interface FilterOption {
  id: string
  name: string
}

export default function BookFilters({
  options
}: {
  options: {
    shelves: FilterOption[]
    authors: FilterOption[]
    genres: FilterOption[]
  }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const shelfId = searchParams.get('shelfId') ?? ''
  const authorId = searchParams.get('authorId') ?? ''
  const genreId = searchParams.get('genreId') ?? ''
  const search = searchParams.get('search') ?? ''

  const [searchInput, setSearchInput] = useState(search)

  // keep the input in sync when the URL changes externally (e.g. clear filters)
  useEffect(() => {
    setSearchInput(search)
  }, [search])

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

  // debounce the free-text search so we don't push on every keystroke
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onSearchChange = (value: string) => {
    setSearchInput(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (value !== search) updateFilter('search', value)
    }, 400)
  }

  const clearFilters = () => {
    const params = new URLSearchParams()
    const perPage = searchParams.get('perPage')
    if (perPage) params.set('perPage', perPage)
    router.push(`/books?${params.toString()}`)
  }

  const hasFilters = shelfId || authorId || genreId || search

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <TextField
        size="small"
        placeholder="Search by title"
        value={searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 220 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          )
        }}
      />

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Shelf</InputLabel>
        <Select
          value={shelfId}
          label="Shelf"
          onChange={(e) => updateFilter('shelfId', e.target.value)}
        >
          <MenuItem value="">All shelves</MenuItem>
          {options.shelves.map((s) => (
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
          {options.authors.map((a) => (
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
          {options.genres.map((g) => (
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
