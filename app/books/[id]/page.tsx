import { getBookById, getBookTitleById } from '@/src/client'
import { Box, Typography } from '@mui/material'
import { Metadata } from 'next'
import Image from 'next/image'

type BookPageProps = {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: BookPageProps): Promise<Metadata> {
  const bookTitle = await getBookTitleById(params.id)

  return {
    title: `book - ${bookTitle}`
  }
}

export default async function Page({ params }: BookPageProps) {
  const book = await getBookById(params.id)

  return (
    <Box
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <Image
        src={book.imgUrl ?? '/avatar-placeholder.svg'}
        alt="book-cover"
        width={225}
        height={330}
      />
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Typography
            sx={{
              width: 100
            }}
          >
            Pages:
          </Typography>
          <Typography>{book.pages}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
