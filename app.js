'use strict'

require('dotenv').config()

GLOBAL._ = require('lodash')

var express = require('express')
var exphbs = require('express-handlebars')

var app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use('/', require('./routes/home'))
app.use('/room', require('./routes/room'))



app.listen(3000, () => { console.log('Listening on *:3000') })
