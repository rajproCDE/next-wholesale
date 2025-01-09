'use client'

import { useState } from 'react'

type Message = {
  id: number
  text: string
  sender: 'user' | 'support'
}

export default function Support() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'support' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const userMessage: Message = { id: messages.length + 1, text: newMessage, sender: 'user' }
      setMessages([...messages, userMessage])
      setNewMessage('')
      
      // Simulate support response
      setTimeout(() => {
        const supportMessage: Message = { id: messages.length + 2, text: "Thank you for your message. Our support team will get back to you shortly.", sender: 'support' }
        setMessages(prev => [...prev, supportMessage])
      }, 1000)
    }
  }

  return (
    <div className="flex min-h-screen flex-col p-6 md:p-24">
      <h1 className="text-4xl font-bold mb-8">Support</h1>
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="h-96 overflow-y-auto p-4 border-b">
          {messages.map(message => (
            <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow mr-2 p-2 border rounded"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

