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
GET ALL BOOKS
<img width="1397" height="999" alt="image" src="https://github.com/user-attachments/assets/a296f45c-cb8e-4763-9ad7-b86e13ed503a" />
GET BOOK BY ID
<img width="1375" height="920" alt="image" src="https://github.com/user-attachments/assets/d6bca6f3-627a-45c3-9a4b-f215d0a0cbca" />
CREATE BOOK
<img width="1441" height="1012" alt="image" src="https://github.com/user-attachments/assets/8333e09a-5f1a-4ec8-b71e-df2ae29b64c5" />
UPDATE BOOK
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/e854de08-3079-4a9d-964e-cd613297b1f5" />
DELETE BOOK
<img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/83aa5b64-97bc-4128-9b54-60b5aedfece3" />
BORROW/PEMINJAMAN
<img width="1886" height="1005" alt="image" src="https://github.com/user-attachments/assets/1b6faa7c-e61e-4b17-ae82-120853ec67da" />





