var expect = require('chai').expect

var roomManager = require('../roomManager')

describe('the room manager', () => {
  it('creates a room for the owner', () => {
    var room = roomManager.createRoom('owner')
    expect(room.owner).to.equal('owner')
  })
})

