import type { CSSProperties } from "react";
import type { Book } from "../types/book";

interface BookCardProps {
  book: Book;
  isFavorited: boolean;
  onToggleFavorite: (book: Book) => void;
}

export default function BookCard({
  book,
  isFavorited,
  onToggleFavorite,
}: BookCardProps) {
  return (
    <div style={styles.card}>
      <button
        onClick={() => onToggleFavorite(book)}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        style={styles.favoriteButton}
      >
        {isFavorited ? "★" : "☆"}
      </button>

      {book.thumbnail ? (
        <img src={book.thumbnail} alt={book.title} style={styles.cover} />
      ) : (
        <div style={styles.noCover}>No cover</div>
      )}

      <h3 style={styles.title}>{book.title}</h3>
      <p style={styles.author}>{book.authors.join(", ")}</p>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  card: {
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "none",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    color: "#e0a800",
    lineHeight: 1,
  },
  cover: {
    width: 100,
    height: 150,
    objectFit: "cover",
    marginBottom: 8,
  },
  noCover: {
    width: 100,
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f0f0",
    color: "#888",
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    margin: "4px 0",
  },
  author: {
    fontSize: 13,
    color: "#555",
    margin: 0,
  },
};