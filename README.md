# Library System with Geolocation (UCP 1)

## Fitur Utama
- **Role Simulation**: Simulasi role Admin dan User menggunakan Header `x-user-role`.
- **Admin Features**: CRUD Buku (Create, Read, Update, Delete).
- **User Features**: Peminjaman buku dengan pencatatan Geolocation (Latitude, Longitude).
- **Validation**: Validasi input dan stok buku.

## Prasyarat
- Node.js installed
- MySQL Database installed and running

## Struktur Database (Sequelize Generated)
Aplikasi akan otomatis membuat tabel saat pertama kali dijalankan (`sequelize.sync({ alter: true })`).

- **books**: Menyimpan data buku.
  - `id` (PK)
  - `title`
  - `author`
  - `stock`
  - timestamps

- **borrow_logs**: Mencatat riwayat peminjaman dan lokasi.
  - `id` (PK)
  - `userId` (Simulasi)
  - `bookId` (FK -> books.id)
  - `borrowDate`
  - `latitude`
  - `longitude`

## API Documentation

### Headers Wajib (Simulasi Auth)
- Admin: `x-user-role: admin`
- User: `x-user-role: user` dan `x-user-id: [any_integer]`

### Endpoints

#### 1. Public (Semua Role)
- **Get All Books**
  - URL: `GET /api/books`
  - Desc: Melihat semua buku.

- **Get Book Detail**
  - URL: `GET /api/books/:id`
  - Desc: Melihat detail buku tertentu.

#### 2. Admin Only (`x-user-role: admin`)
- **Add Book**
  - URL: `POST /api/books`
  - Body:
    ```json
    {
      "title": "Judul Buku",
      "author": "Nama Penulis",
      "stock": 10
    }
    ```

- **Update Book**
  - URL: `PUT /api/books/:id`
  - Body: (Sama seperti Add Book)

- **Delete Book**
  - URL: `DELETE /api/books/:id`

#### 3. User Only (`x-user-role: user`)
- **Borrow Book**
  - URL: `POST /api/borrow`
  - Header Wajib: `x-user-id: 1`
  - Body:
    ```json
    {
      "bookId": 1,
      "latitude": -6.2088,
      "longitude": 106.8456
    }
    ```
  - Desc: Mengurangi stok buku dan mencatat lokasi peminjaman.

## Testing Screenshots
