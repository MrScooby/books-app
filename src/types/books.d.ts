export type Book = {
  id: string
  ISBN?: string
  lcId: number
  pages: number
  rating: number
  title: string
  url: string
  // TODO: add genre and shelves
  imgUrl?: string
}
