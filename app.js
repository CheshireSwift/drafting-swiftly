'use strict'

require('dotenv').config()

GLOBAL._ = require('lodash')

var path = require('path')

var express = require('express')
var exphbs = require('express-handlebars')
var app = express()

var http = require('http').Server(app)

var io = require('socket.io')(http)

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/bower_components',  express.static(path.join(__dirname, '/bower_components')));

app.use('/', require('./routes/home'))
app.use('/room', require('./routes/room'))

var users = room => _(io.sockets.connected)
  .filter(['room', room])
  .map('user')
  .value()

io.on('connection', function (socket) {
  socket.on('joined room', function(details) {
    _.assign(socket, _.pick(details, 'room', 'user'))
    socket.emit('user list', users(details.room))
    io.emit(socket.room + ' user list', { users: users(details.room), owner: '' })
  })

  socket.on('chat message', function (chatMessage) {
    console.log(socket.room + ': ' + chatMessage.message)
    socket.broadcast.emit(socket.room + ' new message', {
      user: socket.user,
      message: chatMessage.message
    })
  })
})

http.listen(3000, () => { console.log('Listening on *:3000') })
