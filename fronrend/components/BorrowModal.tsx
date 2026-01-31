'use client';

import React from "react"

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Book {
  id: number;
  title: string;
  author: string;
  stock: number;
}

interface BorrowModalProps {
  book: Book;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BorrowModal({ book, onClose, onSuccess }: BorrowModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
          setUseCurrentLocation(true);
        },
        (error) => {
          setError('Tidak dapat mengakses lokasi Anda');
          console.error(error);
        }
      );
    } else {
      setError('Geolocation tidak didukung di browser Anda');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!latitude || !longitude) {
      setError('Masukkan koordinat lokasi');
      return;
    }

    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/borrow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id.toString() || '',
          'x-user-role': user?.role || 'guest',
        },
        body: JSON.stringify({
          bookId: book.id,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        onSuccess();
      } else {
        setError(data.message || 'Gagal meminjam buku');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Pinjam Buku</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Book Info */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">Judul Buku</p>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{book.title}</h3>
            <p className="text-sm text-slate-600">Penulis: {book.author}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location Section */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Lokasi Peminjaman
              </label>
              
              {/* Quick Location Button */}
              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full mb-3 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
              >
                📍 Gunakan Lokasi Saat Ini
              </button>

              {/* Latitude Input */}
              <div className="mb-3">
                <label className="block text-xs text-slate-600 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="-6.200000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>

              {/* Longitude Input */}
              <div>
                <label className="block text-xs text-slate-600 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.000001"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="106.816666"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Konfirmasi Peminjaman'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-slate-900 hover:bg-slate-50 rounded-lg transition-colors font-medium"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
