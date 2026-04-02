import { Suspense } from 'react'
import BookGrid from '@/components/books/BookGrid'
import BookFilters from '@/components/books/BookFilters'
import PaginationControls from '@/components/books/PaginationControls'
import { getBooks } from '@/lib/api/books'

export default async function BooksPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string; perPage?: string; shelfId?: string; authorId?: string; genreId?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const perPage = Number(params.perPage) || 20

  const books = await getBooks({
    page,
    perPage,
    shelfId: params.shelfId,
    authorId: params.authorId,
    genreId: params.genreId
  })

  return (
    <>
      <Suspense>
        <BookFilters />
      </Suspense>
      <BookGrid books={books.data} />
      <Suspense>
        <PaginationControls
          totalPages={books.meta.totalPages}
          currentPage={books.meta.page}
          perPage={books.meta.perPage}
          total={books.meta.total}
        />
      </Suspense>
    </>
  )
}
