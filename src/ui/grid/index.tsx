'use client'

import GridTile from './gridTile'
import {
  Box,
  MenuItem,
  Grid as MuiGrid,
  Pagination,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { Book } from '@/src/types/books'
import { PaginatedResult } from '@/src/types/pagination.g'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface GridProps {
  collection?: PaginatedResult<Book>
}

// TODO: adjust for smaller screens
export default function Grid({ collection }: GridProps) {
  if (!collection?.data?.length) {
    return (
      // TODO: prepare proper typography and move to separate component
      <div className="w-full h-full flex justify-center items-center">
        Nothing to display.
      </div>
    )
  }

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const currentPerPage = Number(searchParams.get('perPage')) || 20

  const onPaginationClick = (e: any, page: number) => {
    const params = new URLSearchParams(searchParams)

    params.set('page', String(page))

    router.replace(`${pathname}?${params.toString()}`)
  }

  const onPerPageClick = (e: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams)

    params.set('perPage', String(e.target.value))

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 1512
      }}
    >
      <MuiGrid
        container
        sx={{
          margin: 'auto'
        }}
      >
        {collection?.data?.map((element) => {
          return (
            // <Link key={element.name} href={`/${elementType}/${characterId}`}>
            <GridTile key={element.id} element={element} />
            // </Link>
          )
        })}
      </MuiGrid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2
        }}
      >
        <Box sx={{ width: 52 }} />
        <Pagination
          count={collection.meta.totalPages}
          shape="rounded"
          boundaryCount={1}
          siblingCount={2}
          page={currentPage}
          onChange={onPaginationClick}
        />
        <Box>
          <Select
            variant="standard"
            sx={{
              width: 52,
              '&:hover': {
                background: 'none'
              }
            }}
            value={String(currentPerPage)}
            onChange={onPerPageClick}
          >
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  )
}
