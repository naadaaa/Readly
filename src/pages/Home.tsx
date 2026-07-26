import { useState } from "react";
import type { FormEvent, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";
import type { Book, GoogleBooksItem } from "../types/book";
import { mapToBook } from "../types/book";
import { getFavorites, toggleFavorite } from "../utils/favorites";

export default function Home() {
  const { currentUser, logout } = useAuth();
  const userId = currentUser?.uid ?? currentUser?.email ?? "anonymous";

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState<Book[]>(() =>
    getFavorites(userId)
  );

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    const trimmed = query.trim();
    setHasSearched(true);

    if (!trimmed) {
      setBooks([]);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const API_KEY = "AIzaSyBqOUVQhUM5qpGWeuuCC5EBLkN3x6xhjec";

      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(trimmed)}&key=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      const items: GoogleBooksItem[] = data.items ?? [];
      setBooks(items.map(mapToBook));
    } catch (err) {
      setError("Something went wrong while searching. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  function handleToggleFavorite(book: Book) {
    const updated = toggleFavorite(userId, book);
    setFavorites(updated);
  }

  function isFavorited(bookId: string): boolean {
    return favorites.some((b) => b.id === bookId);
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Readly</h1>
        <nav style={styles.nav}>
          <Link to="/home">Home</Link>
          <Link to="/favorites">Favorites</Link>
          <button onClick={() => logout()} style={styles.logoutButton}>
            Log out
          </button>
        </nav>
      </div>

      <p style={styles.subtitle}>Signed in as {currentUser?.email}</p>

      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book title, author, or topic..."
          style={styles.input}
        />
        <button type="submit" style={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && hasSearched && books.length === 0 && (
        <p>No results found. Try a different search.</p>
      )}

      <div style={styles.grid}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorited={isFavorited(book.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: 900,
    margin: "40px auto",
    fontFamily: "sans-serif",
    padding: "0 16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  nav: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  logoutButton: {
    cursor: "pointer",
  },
  subtitle: {
    color: "#555",
    marginTop: 4,
  },
  form: {
    display: "flex",
    gap: 8,
    margin: "20px 0",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 16,
    marginTop: 20,
  },
};