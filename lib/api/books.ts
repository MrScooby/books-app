import { apiFetch, apiPost, apiPatch } from './client'
import {
  PaginatedResponse,
  BookListItem,
  BookDetail,
  CreateBookPayload,
  UpdateBookPayload
} from '../types'

export async function getBooks(params?: {
  page?: number
  perPage?: number
  orderDirection?: 'ASC' | 'DESC'
  search?: string
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
  return apiFetch(`/books/${id}/full`, { cache: 'no-store' })
}

export async function createBook(payload: CreateBookPayload): Promise<string> {
  const res = await apiPost<{ id: string }>('/books', payload)
  return res.id
}

export async function updateBook(
  id: string,
  payload: UpdateBookPayload
): Promise<BookDetail> {
  return apiPatch<BookDetail>(`/books/${id}`, payload)
}

export async function addBookToShelf(
  id: string,
  shelfName: string
): Promise<BookDetail> {
  return apiPatch<BookDetail>(`/books/add-on-shelf/${id}`, { shelfName })
}
