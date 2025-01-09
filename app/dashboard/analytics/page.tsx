'use client'

import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales Analytics',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const initialData = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export default function Analytics() {
  const [data, setData] = useState(initialData)

  return (
    <div className="flex min-h-screen flex-col p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Analytics</h1>
      <div className="w-full max-w-4xl mx-auto">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

