'use client'

import { useState } from 'react'

type InventoryItem = {
  id: number
  name: string
  currentStock: number
  minStock: number
  maxStock: number
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Product A', currentStock: 100, minStock: 50, maxStock: 200 },
    { id: 2, name: 'Product B', currentStock: 75, minStock: 30, maxStock: 150 },
    { id: 3, name: 'Product C', currentStock: 25, minStock: 20, maxStock: 100 },
  ])

  const handleStockUpdate = (id: number, newStock: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, currentStock: newStock } : item
    ))
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
                  {item.currentStock}
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
  )
}

