import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Books from "./pages/Books";
import * as api from "./api";

// Mock the API module
vi.mock("./api");

const mockBooks = [
  {
    id: 1,
    title: "Mock Book",
    author: "Mock Author",
    published_year: 2020,
    genre: "Fiction",
  },
];

describe("Books component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders books list", async () => {
    (api.fetchBooks as any).mockResolvedValueOnce(mockBooks);
    render(<Books />);
    expect(await screen.findByText(/mock book/i)).toBeInTheDocument();
  });

  it("adds a new book", async () => {
    (api.fetchBooks as any).mockResolvedValue([]);
    (api.addBook as any).mockResolvedValue(undefined);

    render(<Books />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Author"), {
      target: { value: "New Author" },
    });
    fireEvent.change(screen.getByPlaceholderText("Published Year"), {
      target: { value: "2024" },
    });
    fireEvent.change(screen.getByPlaceholderText("Genre"), {
      target: { value: "Drama" },
    });

    fireEvent.click(screen.getByText("Add Book"));

    await waitFor(() =>
      expect(api.addBook).toHaveBeenCalledWith({
        title: "New Title",
        author: "New Author",
        published_year: 2024,
        genre: "Drama",
      })
    );
  });
});
