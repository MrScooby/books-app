export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    totalPages: number
    perPage: number
    page: number
  }
}

export interface BookListItem {
  id: string
  ISBN: string | null
  lcId: number
  pages: number
  rating: number
  title: string
  url: string
  genreId: string | null
  imgUrl: string
  createdAt: string
  updatedAt: string
}

export interface BookDetail {
  id: string
  ISBN: string | null
  pages: number
  rating: number
  title: string
  url: string
  genreId: string | null
  imgUrl: string
  shelvesIds: string[]
  authorsIds: string[]
}

export interface ShelfListItem {
  id: string
  name: string
  pages: number
  createdAt: string
  updatedAt: string
}

export interface ShelfDetail {
  id: string
  name: string
  pages: number
  books: BookListItem[]
}

export interface AuthorListItem {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Author {
  id: string
  name: string
  bookIds: string[]
}

export interface GenreListItem {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface Genre {
  id: string
  name: string
}

export interface CreateBookPayload {
  url: string
  rating: number
  shelves: string[]
}
