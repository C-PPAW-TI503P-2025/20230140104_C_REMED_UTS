"use client"

import { useState, useEffect } from "react"
import { bookApi, type Book } from "@/lib/api"
import { BookForm } from "@/components/book-form"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modal/Form State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const res = await bookApi.getAll()
      setBooks(res.data)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Failed to load books. Is the backend running on port 3000?")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleCreate = async (data: any) => {
    try {
      setFormLoading(true)
      await bookApi.create(data)
      await fetchBooks()
      setIsFormOpen(false)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdate = async (data: any) => {
    if (!editingBook) return
    try {
      setFormLoading(true)
      await bookApi.update(editingBook.id, data)
      await fetchBooks()
      setIsFormOpen(false)
      setEditingBook(null)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return
    try {
      await bookApi.delete(id)
      await fetchBooks()
    } catch (err: any) {
      alert(err.message)
    }
  }

  const openCreateModal = () => {
    setEditingBook(null)
    setIsFormOpen(true)
  }

  const openEditModal = (book: Book) => {
    setEditingBook(book)
    setIsFormOpen(true)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Book
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isFormOpen ? (
        <div className="max-w-md mx-auto">
          <BookForm 
            initialData={editingBook}
            onSubmit={editingBook ? handleUpdate : handleCreate}
            onCancel={() => setIsFormOpen(false)}
            loading={formLoading}
          />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">Loading...</TableCell>
                </TableRow>
              ) : books.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    No books found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.id}</TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.stock}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditModal(book)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(book.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
