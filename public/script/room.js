'use strict'

$(document).ready(function() {
  var socket = io()

  var room = window.location.pathname.match(/\/room\/([a-z]+-[a-z]+-[a-z]+)/)[1]

  $('form.chat-entry').submit(function() {
    var chatInput = $('#chatInput')
    var message = chatInput.val()
    if (message) {
      socket.emit('chat message', { room, message })
      chatInput.val('')
    }

    return false
  })
})

