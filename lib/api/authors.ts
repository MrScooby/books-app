import apiClient from './client'
import { Author, AuthorListItem, PaginatedResponse } from '../types'

export async function getAuthors(params?: {
  page?: number
  perPage?: number
}): Promise<PaginatedResponse<AuthorListItem>> {
  const { data } = await apiClient.get('/authors', { params })
  return data
}

export async function getAuthor(id: string): Promise<Author> {
  const { data } = await apiClient.get(`/authors/${id}`)
  return data
}
