'use strict'

$(document).ready(function () {
  var socket = io()

  var room = window.location.pathname.match(/\/room\/([a-z]+-[a-z]+-[a-z]+)/)[1]
  var user = prompt('Please enter a name')

  socket.on(room + ' user list', updateUsers)
  socket.on(room + ' new message', showMessage)

  socket.on('test', x => console.log(x))

  function updateUsers(roomInfo) {
    var userDivs = _(roomInfo.users)
      .sort()
      .map(user => `<div class="player ${user === roomInfo.owner ? 'owner' : ''}">${user}</div>`)
      .value()
    $('#playerList').html(userDivs)
  }

  function showMessage(chatMessage) {
    var chatContent = $('#chatContent')
    chatContent.append(`
      <div class="message">
        ${chatMessage.user}: ${chatMessage.message}
      </div>
    `)
    chatContent[0].scrollTop = chatContent[0].scrollHeight
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
