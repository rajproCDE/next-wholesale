'use client'

import { useState } from 'react'
import Link from 'next/link'
import PaymentForm from '../../../components/PaymentForm'

type Order = {
  id: number
  customerName: string
  total: number
  status: 'pending' | 'approved' | 'shipped' | 'delivered'
  date: string
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, customerName: 'John Doe', total: 10050, status: 'pending', date: '2023-06-01' },
    { id: 2, customerName: 'Jane Smith', total: 7525, status: 'approved', date: '2023-06-02' },
    { id: 3, customerName: 'Bob Johnson', total: 20000, status: 'shipped', date: '2023-06-03' },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  return (
    <div className="flex min-h-screen flex-col p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  ${(order.total / 100).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'approved' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 font-medium">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Payment for Order #{selectedOrder.id}</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Total: ${(selectedOrder.total / 100).toFixed(2)}
                </p>
              </div>
              <PaymentForm amount={selectedOrder.total} />
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

