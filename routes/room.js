'use strict'

var router = require('express').Router();
var rooms = require('../roomManager')

router.get('/', (req, res) => {
  var keyphrase = req.query.keyphrase
  if (!keyphrase) {
    res.status(400).render('bad_key')
  }

  res.redirect('/room/' + keyphrase.replace(/ /g, '-'))
})

router.get('/:keyphrase', (req, res) => {
  var keyphrase = req.params.keyphrase
  if (!/^[a-z]+-[a-z]+-[a-z]+$/.test(keyphrase)) {
    res.status(400).render('bad_key')
    return
  }

  var room = rooms[keyphrase]
  if (!room) {
    res.status(404).render('room_not_found')
    return
  }

  res.render('room', _.merge({}, rooms[keyphrase], {stylesheet: 'room', script: 'room'}))
})

module.exports = router

