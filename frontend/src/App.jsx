import { useState, useEffect } from 'react';
import io from 'socket.io-client'

const socket = io("/")

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([ ...messages, newMessage])
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);
  
  const receiveMessage = (message) => setMessages((state) => [...state, message]);

  return (
      <section className="text-white bg-zinc-900 p-10 border rounded shadow-md max-w-md mx-auto mt-10">
      <header className="flex items-center justify-between mb-10 w-full -mx-8 -mt-8">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <h1 className="text-xl font-bold self-center">Jane Doe</h1>
        </div>
        <div className="-mr-10">
          <div className="relative">
            <img src="../public/prof.pic.webp" alt="Profile" className="h-10 w-10 rounded-full" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-zinc-900"></span>
          </div>
        </div>
      </header>
        <ul className="overflow-y-scroll h-96 mb-4">
          {messages.map((message, index) => (
            <li
            key={index}
            className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
          }`}
          >
              <b>{message.from}</b>:{message.body}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="flex">
          <input
            name="message"
            type="text"
            placeholder="Write your message..."
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-zinc-500 w-full text-black flex-grow p-2 mr-2 border rounded"
            value={message}
            autoFocus
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </form>
      </section>
  )
}

export default App
