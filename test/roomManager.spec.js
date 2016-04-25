'use strict'

var expect = require('chai').expect

var roomManager = require('../roomManager')

describe('the room manager', () => {
  it('creates a room for the owner', () => {
    var room = roomManager.create('owner')
    expect(room.owner).to.equal('owner')
  })
})

