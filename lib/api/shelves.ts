import apiClient from './client'
import { PaginatedResponse, ShelfListItem, ShelfDetail } from '../types'

export async function getShelves(params?: {
  page?: number
  perPage?: number
}): Promise<PaginatedResponse<ShelfListItem>> {
  const { data } = await apiClient.get('/shelves', { params })
  return data
}

export async function getShelf(id: string): Promise<ShelfDetail> {
  const { data } = await apiClient.get(`/shelves/${id}`)
  return data
}
