import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <nav className="mb-8">
        <ul className="flex flex-wrap gap-4">
          <li>
            <Link href="/dashboard/products" className="text-blue-500 hover:text-blue-700">
              Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/orders" className="text-blue-500 hover:text-blue-700">
              Orders
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="text-blue-500 hover:text-blue-700">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/dashboard/inventory" className="text-blue-500 hover:text-blue-700">
              Inventory
            </Link>
          </li>
          <li>
            <Link href="/dashboard/analytics" className="text-blue-500 hover:text-blue-700">
              Analytics
            </Link>
          </li>
          <li>
            <Link href="/dashboard/support" className="text-blue-500 hover:text-blue-700">
              Support
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <p className="mb-4">Welcome to your dashboard. Choose an option from the menu above.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
            {/* We'll implement this component later */}
            <p>Loading recent orders...</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Stock Alerts</h2>
            {/* We'll implement this component later */}
            <p>Loading stock alerts...</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            {/* We'll implement this component later */}
            <p>Loading notifications...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

