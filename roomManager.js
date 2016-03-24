'use strict'

var rooms = {}

if (process.env.NODE_ENV === 'development') {
  rooms['test-room-yay'] = { keyphrase: 'test-room-yay' }
}

module.exports = rooms

