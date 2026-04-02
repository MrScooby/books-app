import { apiFetch } from './client'
import { Genre, GenreListItem, PaginatedResponse } from '../types'

export async function getGenres(params?: {
  page?: number
  perPage?: number
}): Promise<PaginatedResponse<GenreListItem>> {
  return apiFetch('/genres', { params })
}

export async function getGenre(id: string): Promise<Genre> {
  return apiFetch(`/genres/${id}`)
}
