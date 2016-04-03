'use strict'

var mngen = require('mngen')

var rooms = {}

if (process.env.NODE_ENV === 'development') {
  rooms['test-room-yay'] = { keyphrase: 'test-room-yay' }
}

function createRoom(owner) {
  var keyphrase = mngen.word(3)

  // Don't want to clobber an existing room.
  while (rooms[keyphrase]) {
    keyphrase = mngen.word(3)
  }

  console.log(`Creating room ${keyphrase} for ${owner}`)
  return rooms[keyphrase] = {keyphrase, owner}
}

module.exports = {
  createRoom,
  get: keyphrase => rooms[keyphrase]
}

