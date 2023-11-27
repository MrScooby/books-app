import axios from 'axios'
import { Author, Book, Genre } from './types'
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
    console.log('fetch error: ', e)
    throw new Error('Failed to fetch data.')
  }
}

export const getBookTitleById = async (id: string): Promise<string> => {
  try {
    const res = await api.get<string>(`/books/title/${id}`)

    const bookTitle = res.data

    return bookTitle
  } catch (e) {
    console.log('fetch error: ', e)
    throw new Error('Failed to fetch data.')
  }
}

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const res = await api.get<Book>(`/books/${id}`)

    const bookData = res.data

    return bookData
  } catch (e) {
    console.log('fetch error: ', e)
    throw new Error('Failed to fetch data.')
  }
}

export const getGenreNameById = async (id: string): Promise<String> => {
  try {
    const res = await api.get<String>(`/genres/name/${id}`)

    const genreName = res.data

    return genreName
  } catch (e) {
    console.log('fetch error: ', e)
    throw new Error('Failed to fetch data.')
  }
}

// export const getAuthorsNamesByIds = async (
//   ids: string[]
// ): Promise<Author[]> => {
//   try {
//     const res = await api.get<Author[]>(`/authors/${id}`)

//     const authorsNames = res.data

//     return authorsNames
//   } catch (e) {
//     console.log('fetch error: ', e)
//     throw new Error('Failed to fetch data.')
//   }
// }
