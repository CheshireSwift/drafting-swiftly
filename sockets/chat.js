'use strict'

module.exports = function(io) {
  var users = room => _(io.sockets.connected)
    .filter(['room', room])
    .map('user')
    .value()

  function updateUsers(room) {
      io.emit(room + ' user list', { users: users(room), owner: '' })
  }

  io.on('connection', function (socket) {
    socket.on('joined room', function(details) {
      _.assign(socket, _.pick(details, 'room', 'user'))
      socket.emit('user list', users(socket.room))
      updateUsers(socket.room)
    })

    socket.on('chat message', function (chatMessage) {
      console.log(socket.room + ': ' + chatMessage.message)
      socket.broadcast.emit(socket.room + ' new message', {
        user: socket.user,
        message: chatMessage.message
      })
    })

    socket.on('disconnect', () => updateUsers(socket.room))
  })
}

