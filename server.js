const { name } = require('ejs')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  },
})

const port = Number(process.env.PORT) || 3000

app.set("views", "./views");
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const rooms = {  }

app.get('/', (req, res) => {
  res.render('index', { rooms: rooms })
})

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect("/")
  }
  res.render('room', { roomName: req.params.room })
})

app.get('/clean', (req, res) => {
  res.render('clean')
})

server.listen(port, () => console.log(`Server is running on port ${port}`));

io.on('connection', socket => {
    socket.on('new-user', (room, userName) => {
        socket.join(room)
        rooms[room].users[socket.id] = userName
        socket.to(room).broadcast.emit('user-connected', userName)
    })
    socket.on('send-chat-message', (room, message) => {
        socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
    })
    socket.on('disconnect', () => {
      getUserRooms(socket).forEach(room => {
        socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
        delete rooms[room].users[socket.id]
      })
    })
    socket.on('clear-rooms', () => {
      rooms = {}
    })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}