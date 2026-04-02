import { apiFetch } from './client'
import { Author, AuthorListItem, PaginatedResponse } from '../types'

export async function getAuthors(params?: {
  page?: number
  perPage?: number
}): Promise<PaginatedResponse<AuthorListItem>> {
  return apiFetch('/authors', { params })
}

export async function getAuthor(id: string): Promise<Author> {
  return apiFetch(`/authors/${id}`)
}
