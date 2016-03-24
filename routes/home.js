'use strict'

var router = require('express').Router()
var rooms = require('../roomManager')
var mngen = require('mngen')

router.get('/', (req, res) => {
  res.render('home', {stylesheet: 'home'})
})

router.post('/create', (req, res) => {
  var keyphrase = mngen.word(3)

  // Don't want to clobber an existing room.
  while (rooms[keyphrase]) {
    keyphrase = mngen.word(3)
  }

  rooms[keyphrase] = {keyphrase}
  res.redirect('/room/' + keyphrase)
})

module.exports = router

