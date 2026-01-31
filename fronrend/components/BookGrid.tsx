'use client';

import BookCard from './BookCard';

interface Book {
  id: number;
  title: string;
  author: string;
  stock: number;
}

interface BookGridProps {
  books: Book[];
  onBorrowClick: (book: Book) => void;
}

export default function BookGrid({ books, onBorrowClick }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">Tidak ada buku yang tersedia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onBorrowClick={onBorrowClick} />
      ))}
    </div>
  );
}
