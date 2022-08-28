const express = require('express')
const cors = require('cors')
const http = require('http')
const colors = require('colors')
const { Server } = require('socket.io')

const app = express()
app.use(cors())

const PORT = 8000

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    // add multiple origins here
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`.bgYellow)

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })

  // reckognize when a client disconnects
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`.bgRed)
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.black)
})
