# Library System Frontend - Setup Guide

## Prasyarat
- Node.js 18+ terinstall
- Backend API berjalan (pastikan backend sudah dijalankan terlebih dahulu)

---

## Langkah-Langkah Setup

### 1. Instalasi Dependencies
```bash
npm install
```
Atau jika menggunakan yarn:
```bash
yarn install
```

### 2. Konfigurasi Environment (Opsional)
Jika backend Anda berjalan di port selain 3000, buat file `.env.local` di root project:

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2.1 Authentication Setup
Frontend sekarang sudah memiliki sistem login yang mengirimkan header authentication:

- **Header `x-user-id`**: ID pengguna (number)
- **Header `x-user-role`**: Role pengguna (admin atau user)

Login form akan muncul sebelum mengakses aplikasi. Masukkan User ID dan pilih role untuk melanjutkan.

**Demo Credentials:**
- User ID: `1`, Role: `user`
- User ID: `2`, Role: `admin`
- User ID: `999`, Role: `user`

### 3. Jalankan Development Server
```bash
npm run dev
```

Frontend akan berjalan di: **http://localhost:3000**

Jika port 3000 sudah digunakan, Next.js secara otomatis akan menggunakan port berikutnya (contoh: 3001).

---

## Konfigurasi Backend API

Pastikan backend API Anda telah dikonfigurasi dengan benar:

### Endpoint yang Diperlukan:

1. **GET /api/books**
   - **Headers yang diperlukan:**
     - `x-user-id`: User ID (number)
     - `x-user-role`: User role (string: 'admin' atau 'user')
   - **Response format:** `{ status: "success", data: [...] }`
   - **Data array struktur:**
     ```json
     {
       "id": 1,
       "title": "Judul Buku",
       "author": "Nama Penulis",
       "stock": 5
     }
     ```

2. **POST /api/borrow**
   - **Headers yang diperlukan:**
     - `Content-Type: application/json`
     - `x-user-id`: User ID (number)
     - `x-user-role`: User role (string: 'admin' atau 'user')
   - **Body request:**
     ```json
     {
       "bookId": 1,
       "latitude": -6.2088,
       "longitude": 106.8456
     }
     ```
   - **Response format:** `{ status: "success", message: "..." }` atau `{ status: "error", message: "..." }`

### CORS Configuration
Backend harus mengizinkan request dari origin frontend (http://localhost:3000 untuk development).

**Contoh konfigurasi CORS di backend:**
```javascript
// Jika menggunakan Express.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## Build untuk Production

```bash
npm run build
npm start
```

Frontend akan production-ready di: **http://localhost:3000**

---

## Troubleshooting

### 1. Error: "Failed to fetch from API"
- Pastikan backend API sudah berjalan
- Cek apakah CORS sudah dikonfigurasi di backend
- Verifikasi URL API yang benar di dalam kode

### 2. Error: "Geolocation not available"
- Feature geolocation memerlukan HTTPS pada production
- Di localhost (development), pastikan browser mengizinkan akses lokasi

### 3. Port 3000 sudah digunakan
- Next.js akan otomatis menggunakan port bebas berikutnya
- Atau manual specify port: `npm run dev -- -p 3001`

---

## File Struktur
```
/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage (main component)
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Header navigation
│   ├── BookGrid.tsx        # Grid daftar buku
│   ├── BookCard.tsx        # Individual book card
│   └── BorrowModal.tsx     # Modal peminjaman buku
├── SETUP.md                # File ini
└── package.json
```

---

## Feature Overview

### Dashboard Buku
- Menampilkan semua buku dari backend
- Real-time stock information
- Loading state dan error handling

### Peminjaman Buku
- Modal form untuk mengisi data peminjaman
- Auto-detect lokasi menggunakan Geolocation API
- Manual input latitude & longitude
- Validasi form sebelum submit

### UI/UX
- Responsive design (mobile & desktop)
- Loading spinner
- Error messages
- Success feedback

---

## Development Tips

### Mengubah API Endpoint
Jika backend berjalan di URL berbeda, update di:

**File: `/app/page.tsx`** (baris ~27)
```javascript
const response = await fetch('YOUR_API_URL/api/books');
```

**File: `/components/BorrowModal.tsx`** (baris ~53)
```javascript
const response = await fetch('YOUR_API_URL/api/borrowing', {
```

### Environment Variable (Rekomendasi)
Untuk production, gunakan environment variables. Ubah hardcoded URLs ke:
```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const response = await fetch(`${apiUrl}/api/books`);
```

---

## Support
Jika ada error atau pertanyaan, check console browser (F12) untuk melihat error details.
