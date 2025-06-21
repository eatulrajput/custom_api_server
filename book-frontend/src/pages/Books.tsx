import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Book, NewBook } from "../api";
import { fetchBooks, addBook, deleteBook } from "../api";

const initialForm: NewBook = {
  title: "",
  author: "",
  published_year: new Date().getFullYear(),
  genre: "",
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<NewBook>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const data = await fetchBooks();
    setBooks(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, published_year: Number(form.published_year) };

    if (editingId === null) {
      await addBook(payload);
    } else {
      await fetch(`http://127.0.0.1:8000/books/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setEditingId(null);
    }

    setForm(initialForm);
    loadBooks();
  }

  async function handleDelete(id: number) {
    await deleteBook(id);
    loadBooks();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-gray-800 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center tracking-tight">
          📚 Book Manager
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
          <Input
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <Input
            type="number"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50"
            placeholder="Published Year"
            value={form.published_year}
            onChange={(e) =>
              setForm({ ...form, published_year: +e.target.value })
            }
          />
          <Input
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50"
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          />
          <div className="flex gap-4">
            <Button type="submit" className="w-full">
              {editingId === null ? "Add Book" : "Update Book"}
            </Button>
            {editingId !== null && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setEditingId(null);
                  setForm(initialForm);
                }}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </form>

        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="flex justify-between items-start bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm"
            >
              <div>
                <p className="text-lg font-semibold">{book.title}</p>
                <p className="text-sm text-white/60">
                  {book.author}, {book.published_year} — {book.genre}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setForm(book);
                    setEditingId(book.id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
