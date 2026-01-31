"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Book } from "@/lib/api"

interface BookFormProps {
  initialData?: Book | null
  onSubmit: (data: { title: string; author: string; stock: number }) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function BookForm({ initialData, onSubmit, onCancel, loading }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    stock: 0,
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        stock: initialData.stock,
      })
    } else {
        setFormData({ title: "", author: "", stock: 0 })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? "Edit Book" : "Add New Book"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : initialData ? "Update Book" : "Create Book"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
