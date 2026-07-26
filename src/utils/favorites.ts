import type { Book } from "../types/book";

function getStorageKey(userId: string): string {
  return `readly:favorites:${userId}`;
}

export function getFavorites(userId: string): Book[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? (JSON.parse(raw) as Book[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(userId: string, bookId: string): boolean {
  return getFavorites(userId).some((b) => b.id === bookId);
}

export function addFavorite(userId: string, book: Book): Book[] {
  const current = getFavorites(userId);
  if (current.some((b) => b.id === book.id)) return current;
  const updated = [...current, book];
  localStorage.setItem(getStorageKey(userId), JSON.stringify(updated));
  return updated;
}

export function removeFavorite(userId: string, bookId: string): Book[] {
  const current = getFavorites(userId);
  const updated = current.filter((b) => b.id !== bookId);
  localStorage.setItem(getStorageKey(userId), JSON.stringify(updated));
  return updated;
}

export function toggleFavorite(userId: string, book: Book): Book[] {
  return isFavorite(userId, book.id)
    ? removeFavorite(userId, book.id)
    : addFavorite(userId, book);
}