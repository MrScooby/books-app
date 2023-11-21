import axios from 'axios'
import { Book } from './types/books'
import { PaginatedResult, SearchPaginatedData } from './types/pagination.g'

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// TODO: needed? maybe for adding new books
// api.defaults.headers.common['Authorization'] = AUTH_TOKEN

export const getBooksPaginated = async (
  query: SearchPaginatedData
): Promise<PaginatedResult<Book>> => {
  try {
    const params: SearchPaginatedData = {
      perPage: query.perPage,
      page: query.page
    }

    const res = await api.get<PaginatedResult<Book>>('/books', {
      params
    })

    const paginatedData = res.data

    // await new Promise((resolve) => setTimeout(resolve, 3000))
    return paginatedData
  } catch (e) {
    // TODO: better error handling - generic errors? redirect to error page
    console.log('fetch books error: ', e)
    throw new Error('Failed to fetch books.')
  }
}
