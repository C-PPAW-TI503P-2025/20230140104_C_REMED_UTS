export interface Book {
  id: number;
  title: string;
  author: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = 'http://localhost:3000/api';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

async function fetchAPI(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', headers = {}, body } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'admin', // Hardcoded for Admin Dashboard
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API Request Failed');
  }

  return data;
}

export const bookApi = {
  getAll: () => fetchAPI('/books'),
  getById: (id: number) => fetchAPI(`/books/${id}`),
  create: (data: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => 
    fetchAPI('/books', { method: 'POST', body: data }),
  update: (id: number, data: Partial<Book>) => 
    fetchAPI(`/books/${id}`, { method: 'PUT', body: data }),
  delete: (id: number) => 
    fetchAPI(`/books/${id}`, { method: 'DELETE' }),
};
