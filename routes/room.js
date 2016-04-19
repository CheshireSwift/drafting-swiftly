'use strict'

var router = require('express').Router()
var rooms = require('../roomManager')

function validateKeyphrase(req, res) {
  var keyphrase = req.params.keyphrase || req.query.keyphrase
  if (!keyphrase || !/^[a-z]+-[a-z]+-[a-z]+$/.test(keyphrase)) {
    res.status(400).render('bad_key')
    return false
  }

  return keyphrase
}

router.get('/', (req, res) => {
  var keyphrase = validateKeyphrase(req, res)
  if (!keyphrase) { return }

  res.redirect('/room/' + keyphrase.replace(/ /g, '-'))
})

router.get('/:keyphrase', (req, res) => {
  var keyphrase = validateKeyphrase(req, res)
  if (!keyphrase) { return }

  var room = rooms.get(keyphrase)
  if (!room) {
    res.status(404).render('room_not_found')
    return
  }

  var template = room.started ? 'draft' : 'room'
  res.render(template, _.merge({},
    room,
    {stylesheet: template, script: template},
    {isOwner: room.isOwner(req.cookies['drafting-swiftly_username'])}
  ))
})

router.get('/:keyphrase/start', (req, res) => {
  var keyphrase = validateKeyphrase(req, res)
  if (!keyphrase) { return }

  var room = rooms.get(keyphrase)
  room.started = true
  res.redirect('/room/' + keyphrase)
})

module.exports = router

