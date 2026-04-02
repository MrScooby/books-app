import apiClient from './client'
import { Genre, GenreListItem, PaginatedResponse } from '../types'

export async function getGenres(params?: {
  page?: number
  perPage?: number
}): Promise<PaginatedResponse<GenreListItem>> {
  const { data } = await apiClient.get('/genres', { params })
  return data
}

export async function getGenre(id: string): Promise<Genre> {
  const { data } = await apiClient.get(`/genres/${id}`)
  return data
}
