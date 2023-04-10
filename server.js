const express = require('express')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

//dont have a home page so it creates a new room
app.get('/', (req, res) => {
    //homepage generates a random uuid and redirects to that room
    var roomId = uuidV4()
    res.redirect(`/${roomId}`)
})

app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', userId)
        })

        socket.on('send-msg', msg => {
            socket.to(roomId).emit('receive', msg)
        })
    })

    
})

server.listen(3000)