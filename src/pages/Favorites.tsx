import { useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";
import { getFavorites, removeFavorite } from "../utils/favorites";

export default function Favorites() {
  const { currentUser, logout } = useAuth();
  const userId = currentUser?.uid ?? currentUser?.email ?? "anonymous";

  const [favorites, setFavorites] = useState(() => getFavorites(userId));

  function handleRemove(bookId: string) {
    const updated = removeFavorite(userId, bookId);
    setFavorites(updated);
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

      <h2>Your Favorites</h2>

      {favorites.length === 0 ? (
        <p>
          You haven't saved any books yet. Go to{" "}
          <Link to="/home">Home</Link> and star a book to save it here.
        </p>
      ) : (
        <div style={styles.grid}>
          {favorites.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorited={true}
              onToggleFavorite={() => handleRemove(book.id)}
            />
          ))}
        </div>
      )}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 16,
    marginTop: 20,
  },
};