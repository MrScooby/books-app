import { apiFetch } from './client'
import { PaginatedResponse, ShelfListItem, ShelfDetail } from '../types'

export async function getShelves(params?: {
  page?: number
  perPage?: number
}): Promise<PaginatedResponse<ShelfListItem>> {
  return apiFetch('/shelves', { params })
}

export async function getShelf(id: string): Promise<ShelfDetail> {
  return apiFetch(`/shelves/${id}`)
}
