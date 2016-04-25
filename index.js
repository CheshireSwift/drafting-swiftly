'use strict'

require('dotenv').config()

GLOBAL._ = require('lodash')

// Create HTTP server running app, configure socket comms
var http = require('http').Server(require('./app'))
var sockets = require('./socketLoader')(http)
sockets.use('./sockets/chat')

// Run the server
http.listen(3000, () => { console.log('Listening on *:3000') })

