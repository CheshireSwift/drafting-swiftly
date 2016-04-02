'use strict'

$(document).ready(function () {
  var socket = io()

  var roomInfo

  var room = window.location.pathname.match(/\/room\/([a-z]+-[a-z]+-[a-z]+)/)[1]
  var user = ds.getUser()

  socket.on(room + ' user list', updateUsers)
  socket.on(room + ' new message', showMessage)

  socket.on('test', x => console.log(x))

  function updateUsers(serverRoomInfo) {
    roomInfo = serverRoomInfo
    var userDivs = _(roomInfo.users)
      .sort()
      .map(player => `<div class="player ${userClasses(roomInfo, player)}">${player}</div>`)
      .value()
    $('#playerList').html(userDivs)
  }

  function showMessage(chatMessage) {
    var chatContent = $('#chatContent')
    chatContent.append(`
      <div class="message">
        <span class="${userClasses(roomInfo, chatMessage.user)}">${chatMessage.user}</span>: ${chatMessage.message}
      </div>
    `)
    chatContent[0].scrollTop = chatContent[0].scrollHeight
  }

  function userClasses(roomInfo, player) {
    return _.filter([
      player === roomInfo.owner && 'owner',
      player === user && 'self'
    ]).join(' ')
  }

  $('form.chat-entry').submit(function () {
    var chatInput = $('#chatInput')
    var message = chatInput.val()
    if (message) {
      socket.emit('chat message', { message })
      chatInput.val('')
      showMessage({message, user})
    }

    return false
  })

  socket.emit('joined room', { room, user })
})
