import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { FiSend } from 'react-icons/fi'

const socket = io('http://localhost:8000')

const App = () => {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState('')

  const sendMessage = () => {
    socket.emit('send_message', { message })
    setMessage('')
  }

  useEffect(() => {
    socket.on('receive_message', (data: any) => {
      setMessageReceived(data.message)
    })
  }, [])

  return (
    <div className='App'>
      <div className='container flex flex-col items-center text-center py-10 mx-auto h-96 relative'>
        <h1 className='text-4xl font-bold'>Message:</h1>
        {messageReceived && (
          <p className='text-lg mt-4 font-bold'>{messageReceived}</p>
        )}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center'>
          <input
            type='text'
            placeholder='Write a message...'
            className='input input-bordered input-primary w-full max-w-xs'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='btn btn-primary m-4' onClick={sendMessage}>
            Button <FiSend className='ml-2' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
