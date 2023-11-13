import { Book } from '@/src/types/books'
import Grid from '@/src/ui/grid'

type BooksPage = {
  books: Book[]
}

export default function Books({ books }: BooksPage) {
  return <Grid data={books} />
}
