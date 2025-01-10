'use client';

import { useState } from 'react';

export default function Profile() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [userType, setUserType] = useState('Wholesaler');
  const [address, setAddress] = useState('123 Main St, City, Country');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile update:', { name, email, userType, address });
  };

  return (
    <div className="flex min-h-screen flex-col p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userType" className="block text-gray-700 text-sm font-bold mb-2">
            User Type:
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Wholesaler">Wholesaler</option>
            <option value="Retailer">Retailer</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
