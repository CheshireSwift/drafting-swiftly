'use strict'

module.exports = function(http) {
  var io = require('socket.io')(http)
  return {
    use: function(path) {
      require(path)(io)
    }
  }
}

