import type { NewBook } from "../api"

export function isBookValid(book: NewBook): boolean {
  return (
    book.title.trim() !== "" &&
    book.author.trim() !== "" &&
    !isNaN(book.published_year) &&
    book.genre.trim() !== ""
  )
}
