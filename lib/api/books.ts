import apiClient from './client'
import { PaginatedResponse, BookListItem, BookDetail, CreateBookPayload } from '../types'

export async function getBooks(params?: {
  page?: number
  perPage?: number
  orderDirection?: 'ASC' | 'DESC'
  shelfId?: string
  authorId?: string
  genreId?: string
}): Promise<PaginatedResponse<BookListItem>> {
  const { data } = await apiClient.get('/books', { params })
  return data
}

export async function getBook(id: string): Promise<BookDetail> {
  const { data } = await apiClient.get(`/books/${id}`)
  return data
}

export async function createBook(payload: CreateBookPayload): Promise<string> {
  const { data } = await apiClient.post('/books', payload)
  return data
}
