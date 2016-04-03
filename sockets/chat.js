'use strict'

var rooms = require('../roomManager')

module.exports = function(io) {
  var users = room => _(io.sockets.connected)
    .filter(['room', room])
    .map('user')
    .value()

  function updateUsers(keyphrase) {
      io.emit(keyphrase + ' user list', {
        users: users(keyphrase), owner: rooms.get(keyphrase).owner
      })
  }

  io.on('connection', function (socket) {
    socket.on('joined room', function(details) {
      _.assign(socket, _.pick(details, 'room', 'user'))
      socket.emit('user list', users(socket.room))
      updateUsers(socket.room)
    })

    socket.on('chat message', function (chatMessage) {
      socket.broadcast.emit(socket.room + ' new message', {
        user: socket.user,
        message: chatMessage.message
      })
    })

    socket.on('disconnect', () => updateUsers(socket.room))
  })
}

