const io = require('socket.io')(3000, {
  cors: {
    origin: "*",
  },
})

io.on('connection', socket => {
    console.log("New user")
    socket.emit('chat-message', 'Hello world')
})