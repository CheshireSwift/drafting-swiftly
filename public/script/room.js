'use strict'

var user = ds.getUser()

const domManip = function() {
  var roomInfo

  function configureEventHandlers() {
    $('form.chat-entry').submit(function () {
      var message = domManip.getAndClearChatInput()
      if (message) {
        sockets.sendChatMessage(message)
        domManip.showMessage({message, user})
      }

      return false
    })
  }

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

  function getAndClearChatInput() {
    var chatInput = $('#chatInput')
    var message = chatInput.val()
    chatInput.val('')
    return message
  }

  function userClasses(roomInfo, player) {
    return _.filter([
      player === roomInfo.owner && 'owner',
      player === user && 'self'
    ]).join(' ')
  }

  return { configureEventHandlers, updateUsers, showMessage, getAndClearChatInput }
}()

const sockets = function() {
  var socket = io()

  function configureSocketHandlers(room) {
    socket.on(room + ' user list', domManip.updateUsers)
    socket.on(room + ' new message', domManip.showMessage)
    socket.on(room + ' refresh', document.location.reload.bind(null, true))
    socket.on('test', x => console.log(x))
  }

  function announcePresence(room) {
    socket.emit('joined room', { room, user })
  }

  function sendChatMessage(message) {
    socket.emit('chat message', { message })
  }

  return { configureSocketHandlers, announcePresence, sendChatMessage }
}()

$(document).ready(function () {
  var room = window.location.pathname.match(/\/room\/([a-z]+-[a-z]+-[a-z]+)/)[1]
  sockets.configureSocketHandlers(room)
  domManip.configureEventHandlers()
  sockets.announcePresence(room)
})

