'use client';

interface Book {
  id: number;
  title: string;
  author: string;
  stock: number;
}

interface BookCardProps {
  book: Book;
  onBorrowClick: (book: Book) => void;
}

export default function BookCard({ book, onBorrowClick }: BookCardProps) {
  const isAvailable = book.stock > 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* Book Cover */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <div className="text-6xl">📖</div>
      </div>

      {/* Book Info */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-1">{book.title}</h3>
        <p className="text-sm text-slate-600 mb-3">{book.author}</p>

        {/* Stock Badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {isAvailable ? `${book.stock} Tersedia` : 'Tidak Tersedia'}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onBorrowClick(book)}
          disabled={!isAvailable}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
            isAvailable
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'Pinjam Sekarang' : 'Tidak Tersedia'}
        </button>
      </div>
    </div>
  );
}
