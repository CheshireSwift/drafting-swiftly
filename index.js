'use strict'

require('dotenv').config()

GLOBAL._ = require('lodash')

// Create HTTP server running app, configure socket comms
var http = require('http').Server(require('./app'))
var sockets = require('./socketLoader')(http)
sockets.use('./sockets/chat')

// Run the server
var port = process.env.PORT || 3000
http.listen(port, () => { console.log('Listening on *:' + port) })

