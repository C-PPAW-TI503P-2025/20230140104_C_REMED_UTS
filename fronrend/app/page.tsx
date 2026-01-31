'use client';

import { useState, useEffect } from 'react';
import BookGrid from '@/components/BookGrid';
import BorrowModal from '@/components/BorrowModal';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

interface Book {
  id: number;
  title: string;
  author: string;
  stock: number;
}

import AdminPage from './admin/page';

export default function Home() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showBorrowModal, setShowBorrowModal] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') {
      fetchBooks();
    }
  }, [user]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/books`, {
        headers: {
          'x-user-id': user?.id.toString() || '',
          'x-user-role': user?.role || 'guest',
        },
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setBooks(data.data);
      } else {
        setError('Gagal mengambil data buku');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrowClick = (book: Book) => {
    if (book.stock > 0) {
      setSelectedBook(book);
      setShowBorrowModal(true);
    }
  };

  const handleBorrowSuccess = () => {
    setShowBorrowModal(false);
    setSelectedBook(null);
    fetchBooks();
  };

  // Show login form if not authenticated
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // REDIRECT / SHOW ADMIN DASHBOARD IF ADMIN
  if (user?.role === 'admin') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header user={user} onLogout={logout} />
        <AdminPage />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header user={user} onLogout={logout} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Selamat Datang di Library System</h1>
          <p className="text-xl text-slate-600">Jelajahi koleksi buku kami dan pinjam buku favorit Anda</p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-slate-600">Memuat buku...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold">{error}</p>
            <button
              onClick={fetchBooks}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-600">Total buku: <span className="font-bold text-slate-900">{books.length}</span></p>
            </div>
            <BookGrid books={books} onBorrowClick={handleBorrowClick} />
          </>
        )}
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && selectedBook && (
        <BorrowModal
          book={selectedBook}
          onClose={() => setShowBorrowModal(false)}
          onSuccess={handleBorrowSuccess}
        />
      )}
    </main>
  );
}
