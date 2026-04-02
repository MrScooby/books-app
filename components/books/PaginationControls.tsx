'use client'

import { useState } from 'react'
import { Pagination, Box, Select, MenuItem, TextField, FormControl, InputLabel, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

const PER_PAGE_OPTIONS = [10, 20, 40, 100]

export default function PaginationControls({
  totalPages,
  currentPage,
  perPage,
  total
}: {
  totalPages: number
  currentPage: number
  perPage: number
  total: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [goToPage, setGoToPage] = useState('')

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => params.set(k, v))
    router.push(`/books?${params.toString()}`)
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    pushParams({ page: String(page) })
  }

  const handlePerPageChange = (value: number) => {
    pushParams({ perPage: String(value), page: '1' })
  }

  const handleGoToPage = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    const page = Number(goToPage)
    if (page >= 1 && page <= totalPages) {
      pushParams({ page: String(page) })
      setGoToPage('')
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mt: 3, flexWrap: 'wrap' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="small"
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <FormControl size="small" sx={{ minWidth: 70 }}>
          <InputLabel>Show</InputLabel>
          <Select
            value={perPage}
            label="Show"
            onChange={(e) => handlePerPageChange(Number(e.target.value))}
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Go to"
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          onKeyDown={handleGoToPage}
          placeholder={`1-${totalPages}`}
          sx={{ width: 80 }}
        />

        <Typography variant="body2" color="text.secondary">
          {total} books
        </Typography>
      </Box>
    </Box>
  )
}
