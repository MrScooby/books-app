import { apiFetch, apiPost } from './client'
import { PaginatedResponse, BookListItem, BookDetail, CreateBookPayload } from '../types'

export async function getBooks(params?: {
  page?: number
  perPage?: number
  orderDirection?: 'ASC' | 'DESC'
  shelfId?: string
  authorId?: string
  genreId?: string
}): Promise<PaginatedResponse<BookListItem>> {
  return apiFetch('/books', { params })
}

export async function getBook(id: string): Promise<BookDetail> {
  return apiFetch(`/books/${id}`)
}

export interface BookFullDetail {
  id: string
  ISBN: string | null
  pages: number
  rating: number
  title: string
  url: string
  imgUrl: string
  genre: { id: string; name: string } | null
  authors: { id: string; name: string }[]
  shelves: { id: string; name: string }[]
}

export async function getBookFull(id: string): Promise<BookFullDetail> {
  return apiFetch(`/books/${id}/full`)
}

export async function createBook(payload: CreateBookPayload): Promise<string> {
  return apiPost('/books', payload)
}
