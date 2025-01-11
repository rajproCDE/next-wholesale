'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path as needed

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          setError('Failed to fetch products.');
          console.error('Error fetching products:', error.message);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on input
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase()) ||
    product.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-lg">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

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
            <p>Price: &#8377;{product.price.toFixed(2)}</p>
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
  );
}
