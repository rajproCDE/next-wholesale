'use client'

import { useState, useEffect } from 'react'

const Notifications = () => {
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    const eventSource = new EventSource('/api/notifications')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setNotifications((prev) => [...prev, data.message])
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white px-4 py-2 font-bold">Notifications</div>
      <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
        {notifications.map((notification, index) => (
          <li key={index} className="px-4 py-2 text-sm">{notification}</li>
        ))}
      </ul>
    </div>
  )
}

export default Notifications

