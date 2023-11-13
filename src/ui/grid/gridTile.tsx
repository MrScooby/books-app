import Image from 'next/image'
import { Box, Grid as MuiGrid, Typography } from '@mui/material'
import { Book } from '@/app/lib/types/books'

interface GridTileProps {
  element: Book
}

// TODO: resize on smaller screens
export default function GridTile({ element }: GridTileProps) {
  return (
    <MuiGrid
      item
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        width: 200,
        height: 300,
        backgroundColor: 'grey',
        margin: 1,
        '&:last-of-type': {
          marginRight: 'auto'
        },
        borderRadius: 2,
        padding: 2
      }}
    >
      <Image
        src="/avatar-placeholder.svg"
        alt="grid-tile-img"
        width={150}
        height={220}
      />
      <Typography align="center">{element.title}</Typography>
    </MuiGrid>
  )
}
