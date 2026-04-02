import { Suspense } from 'react'
import BookGrid from '@/components/books/BookGrid'
import BookFilters from '@/components/books/BookFilters'
import PaginationControls from '@/components/books/PaginationControls'
import { getBooks } from '@/lib/api/books'
import { getShelves } from '@/lib/api/shelves'
import { getAuthors } from '@/lib/api/authors'
import { getGenres } from '@/lib/api/genres'

export default async function BooksPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string; perPage?: string; shelfId?: string; authorId?: string; genreId?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const perPage = Number(params.perPage) || 20

  const [books, shelves, authors, genres] = await Promise.all([
    getBooks({
      page,
      perPage,
      shelfId: params.shelfId,
      authorId: params.authorId,
      genreId: params.genreId
    }),
    getShelves({ perPage: 100 }),
    getAuthors({ perPage: 100 }),
    getGenres({ perPage: 100 })
  ])

  const sort = (items: { id: string; name: string }[]) =>
    items.sort((a, b) => a.name.localeCompare(b.name))

  const filterOptions = {
    shelves: sort(shelves.data.map((s) => ({ id: s.id, name: s.name }))),
    authors: sort(authors.data.map((a) => ({ id: a.id, name: a.name }))),
    genres: sort(genres.data.map((g) => ({ id: g.id, name: g.name })))
  }

  return (
    <>
      <Suspense>
        <BookFilters options={filterOptions} />
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
