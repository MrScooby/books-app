import axios from 'axios'
import { Book } from './types/books'

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// TODO: needed? maybe for adding new books
// api.defaults.headers.common['Authorization'] = AUTH_TOKEN

export const getBooksPaginated = async (): Promise<Book[]> => {
  try {
    const res = await api.get('/books')

    const data = res.data
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return data
  } catch (e) {
    // TODO: better error handling - generic errors?
    console.log('fetch books error: ', e)
    throw new Error('Failed to fetch books.')
  }
}
