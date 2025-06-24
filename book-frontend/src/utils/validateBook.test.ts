import { isBookValid } from "./validateBook"
import type { NewBook } from "../api"

describe("isBookValid", () => {
  const base: NewBook = {
    title: "Test",
    author: "Author",
    published_year: 2024,
    genre: "Drama",
  }

  it("returns true for valid book", () => {
    expect(isBookValid(base)).toBe(true)
  })

  it("fails if title is empty", () => {
    expect(isBookValid({ ...base, title: "" })).toBe(false)
  })

  it("fails if author is empty", () => {
    expect(isBookValid({ ...base, author: "" })).toBe(false)
  })

  it("fails if genre is empty", () => {
    expect(isBookValid({ ...base, genre: "" })).toBe(false)
  })

  it("fails if published_year is not a number", () => {
    expect(isBookValid({ ...base, published_year: NaN })).toBe(false)
  })
})
