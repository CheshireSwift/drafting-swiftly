'use strict'

require('dotenv').config()

GLOBAL._ = require('lodash')

var express = require('express')
var exphbs = require('express-handlebars')

var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/', require('./routes/home'))
app.use('/room', require('./routes/room'))

io.on('connection', function(socket) {
  console.log('connected')
  socket.on('chat message', function(chatMessage) { console.log(chatMessage.room + ': ' + chatMessage.message) })
})

http.listen(3000, () => { console.log('Listening on *:3000') })
