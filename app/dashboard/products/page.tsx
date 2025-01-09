'use client'

import { useState } from 'react'
import Link from 'next/link'

type Product = {
  id: number
  name: string
  price: number
  category: string
  stock: number
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 10.99, category: 'Category 1', stock: 100 },
    { id: 2, name: 'Product 2', price: 15.99, category: 'Category 2', stock: 50 },
    { id: 3, name: 'Product 3', price: 20.99, category: 'Category 1', stock: 75 },
  ])

  const [filter, setFilter] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.category.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Category: {product.category}</p>
            <p>In Stock: {product.stock}</p>
            <Link href={`/dashboard/products/${product.id}`} className="text-blue-500 hover:text-blue-700">
              View Details
            </Link>
          </div>
        ))}
      </div>
      <Link href="/dashboard/products/new" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Add New Product
      </Link>
    </div>
  )
}

