import { describe, expect, it, vi, afterEach } from "vitest";
import { fetchBooks, addBook, deleteBook } from "./api";
import type { Book, NewBook } from "./api";

// Mock fetch globally
global.fetch = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});

describe("API Utility Functions", () => {
  it("fetchBooks calls the correct endpoint and returns books", async () => {
    const mockBooks: Book[] = [
      { id: 1, title: "Mock", author: "Author", published_year: 2024, genre: "Test" },
    ];

    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(mockBooks),
    });

    const result = await fetchBooks();

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/books/");
    expect(result).toEqual(mockBooks);
  });

  it("addBook sends a POST request with the correct payload", async () => {
    const newBook: NewBook = {
      title: "New",
      author: "Tester",
      published_year: 2024,
      genre: "Sci-Fi",
    };

    const createdBook: Book = { ...newBook, id: 99 };

    (fetch as any).mockResolvedValueOnce({
      json: () => Promise.resolve(createdBook),
    });

    const result = await addBook(newBook);

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/books/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    expect(result).toEqual(createdBook);
  });

  it("deleteBook sends DELETE request to correct URL", async () => {
    (fetch as any).mockResolvedValueOnce({ status: 200 });

    await deleteBook(123);

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8000/books/123", {
      method: "DELETE",
    });
  });
});
