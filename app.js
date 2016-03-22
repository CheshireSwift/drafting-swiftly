'use strict'

require('dotenv').config()

var mngen = require('mngen')

var express = require('express')
var exphbs = require('express-handlebars')

var rooms = {}

var app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home', {stylesheet: 'home'})
})

app.post('/create', (req, res) => {
  var keyphrase = mngen.word(3)

  // Don't want to clobber an existing room.
  while (rooms[keyphrase]) {
    keyphrase = mngen.word(3)
  }

  rooms[keyphrase] = {keyphrase}
  res.redirect('/room/' + keyphrase)
})

app.get('/room/:keyphrase', (req, res) => {
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

  res.render('room', rooms[keyphrase])
})

app.listen(3000, () => { console.log('Listening on *:3000') })
