/// <reference path="typings/types.d.ts" />

import dotenv = require('dotenv')
dotenv.config()

global['_'] = require('lodash')

// Create HTTP server running app, configure socket comms
import http = require('http')
var server = http.createServer(require('./app'))

import socketLoader from './socketLoader'
var sockets = socketLoader(http)
sockets.use('./sockets/chat')

// Run the server
server.listen(3000, () => { console.log('Listening on *:3000') })

