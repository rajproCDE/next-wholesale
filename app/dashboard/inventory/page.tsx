'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path as per your project

type InventoryItem = {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
};

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // Fetching `name` and `stock` (as `currentStock`) from the product table
        const { data, error } = await supabase
          .from('products')
          .select('id, name, stock');

        if (error) {
          setError('Failed to fetch inventory data.');
          console.error('Error fetching inventory:', error.message);
        } else if (data) {
          // Adding static values for `minStock` and `maxStock`
          const formattedData = data.map((item) => ({
            ...item,
            minStock: 50, // Static minimum stock
            maxStock: 200, // Static maximum stock
          }));
          setInventory(formattedData);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleStockUpdate = (id: number, newStock: number) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, currentStock: newStock } : item
      )
    );
  };

  if (loading) {
    return <p className="text-center text-lg">Loading inventory...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex min-h-screen flex-col p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Inventory Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Min Stock
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Max Stock
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {item.stock}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {item.minStock}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {item.maxStock}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 font-medium">
                  <button
                    onClick={() => handleStockUpdate(item.id, item.currentStock + 1)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleStockUpdate(item.id, Math.max(0, item.currentStock - 1))}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
