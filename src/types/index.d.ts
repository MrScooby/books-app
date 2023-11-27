export type Book = {
  id: string
  ISBN?: string
  pages: number
  rating: number
  title: string
  url: string
  genreId?: string
  imgUrl?: string
  shelvesIds: string[]
  authorsIds: string[]
}

export type Genre = {
  name: string
}

export type Author = {
  name: string
  // TODO: add other fields
}

export type Shelf = {
  name: string
  // TODO: add other fields
}
