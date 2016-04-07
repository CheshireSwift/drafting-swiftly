'use strict'

var rooms = require('../roomManager')

module.exports = function(io) {
  var users = room => _(io.sockets.connected)
    .filter(['room', room])
    .map('user')
    .value()

  function getRoomOrRefresh(keyphrase) {
    var room = rooms.get(keyphrase)
    return room || (io.emit(keyphrase + ' refresh'), false)
  }

  function updateUsers(keyphrase) {
    var room = getRoomOrRefresh(keyphrase)
    room && io.emit(keyphrase + ' user list', {
      users: users(keyphrase), owner: room.owner
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

