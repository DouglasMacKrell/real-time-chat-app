const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  },
})

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))

const users = {}

io.on('connection', socket => {
    socket.on('new-user', userName => {
        users[socket.id] = userName
        socket.broadcast.emit('user-connected', userName)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})