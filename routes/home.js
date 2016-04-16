'use strict'

var router = require('express').Router()
var rooms = require('../roomManager')

router.get('/', (req, res) => {
  res.render('home', {stylesheet: 'home', script: 'home'})
})

router.post('/create', (req, res) => {
  var owner = req.body.user
  if (!owner) {
    res.status(400).render('error', {message: 'No username found for owner when creating room'})
  }

  var room = rooms.create(owner)
  res.redirect('/room/' + room.keyphrase)
})

module.exports = router

