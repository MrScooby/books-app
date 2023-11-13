import Books from './books'
import { getBooksPaginated } from '../../src/client'

export default async function Page() {
  const books = await getBooksPaginated()

  return (
    <main>
      <Books books={books} />
    </main>
  )
}
