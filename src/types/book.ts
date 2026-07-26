export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
}

// Shape returned by the Google Books API — only the fields we use
export interface GoogleBooksItem {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export function mapToBook(item: GoogleBooksItem): Book {
  return {
    id: item.id,
    title: item.volumeInfo.title ?? "Untitled",
    authors: item.volumeInfo.authors ?? ["Unknown author"],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? null,
  };
}