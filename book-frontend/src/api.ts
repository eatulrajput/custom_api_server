export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number;
  genre: string;
}

export interface NewBook {
  title: string;
  author: string;
  published_year: number;
  genre: string;
}

const BASE_URL = "http://127.0.0.1:8000/books/";

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function addBook(book: NewBook): Promise<Book> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return await res.json();
}

export async function deleteBook(id: number): Promise<void> {
  await fetch(`${BASE_URL}${id}`, { method: "DELETE" });
}
