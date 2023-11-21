import { getBooksPaginated } from '../../src/client'
import { SearchPaginatedData } from '@/src/types/pagination.g'
import Grid from '@/src/ui/grid'

type BooksPageProps = {
  searchParams: SearchPaginatedData
}

export default async function Page({ searchParams }: BooksPageProps) {
  const currentPage = Number(searchParams.page)
  const books = await getBooksPaginated({ page: currentPage })

  return (
    <main>
      <Grid collection={books} />
    </main>
  )
}
