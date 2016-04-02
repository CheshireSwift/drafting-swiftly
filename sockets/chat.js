'use strict'

module.exports = function(io) {
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

}

