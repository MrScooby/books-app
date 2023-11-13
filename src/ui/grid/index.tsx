import Link from 'next/link'
import GridTile from './gridTile'
import { Box, Grid as MuiGrid } from '@mui/material'
import { Book } from '@/src/types/books'

interface GridProps {
  data?: Book[]
  //   page: number
  //   setPage: (page: number) => void
  //   elementType: string
}

// TODO: resize on smaller screens
export default function Grid({ data }: GridProps) {
  // if (!data?.length) {
  //   return (
  //     <div className="w-full h-full flex justify-center items-center">
  //       Something went wrong - nothing to display
  //     </div>
  //   )
  // }

  //   const numberOfPages = Math.ceil(data?.count / 10)
  //   const pagesButtons = []

  //   for (let i = 0; i < numberOfPages; i++) {
  //     pagesButtons.push(
  //       <div
  //         key={i}
  //         className={`flex cursor-pointer m-2 bg-sky-700 rounded-full w-10 h-10 justify-center items-center
  //                 text-white font-bold ${page === i + 1 && 'bg-sky-900'}`}
  //         onClick={() => setPage(i + 1)}
  //       >
  //         {i + 1}
  //       </div>
  //     )
  //   }

  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: 1200
      }}
    >
      <MuiGrid
        container
        sx={{
          margin: 'auto'
        }}
      >
        {data?.map((element) => {
          return (
            // <Link key={element.name} href={`/${elementType}/${characterId}`}>
            <GridTile key={element.id} element={element} />
            // </Link>
          )
        })}
      </MuiGrid>
      {/* <div className="mt-8 mb-8 flex justify-center">{pagesButtons}</div> */}
    </Box>
  )
}
