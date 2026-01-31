'use client';

import React from "react"

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId.trim()) {
      alert('Masukkan User ID');
      return;
    }

    const id = parseInt(userId);
    if (isNaN(id)) {
      alert('User ID harus berupa angka');
      return;
    }

    setIsSubmitting(true);
    // Simulate login delay
    setTimeout(() => {
      login(id, role);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Library System</h1>
        <p className="text-slate-600 mb-8">Masuk ke sistem perpustakaan</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User ID Input */}
          <div>
            <label htmlFor="userId" className="block text-sm font-semibold text-slate-900 mb-2">
              User ID
            </label>
            <input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Contoh: 1"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm"
              disabled={isSubmitting}
            />
            <p className="text-xs text-slate-500 mt-1">
              Gunakan nomor ID yang telah terdaftar di sistem
            </p>
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-slate-900 mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm bg-white"
              disabled={isSubmitting}
            >
              <option value="user">User (Peminjam)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-slate-600 font-semibold mb-2">Demo Credentials:</p>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• User ID: 1, Role: User</li>
            <li>• User ID: 2, Role: Admin</li>
            <li>• User ID: 999, Role: User</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
