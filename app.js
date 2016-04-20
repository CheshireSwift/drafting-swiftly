'use strict'

require('dotenv').config()

GLOBAL._ = require('lodash')

var path = require('path')

// Create express app
var express = require('express')
var exphbs = require('express-handlebars')
var app = express()

// Templating
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Static routes
app.use(express.static(path.join(__dirname, 'public')))
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')))

// Cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser());

// POST request parsing
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Dynamic routes
app.use('/', require('./routes/home'))
app.use('/room', require('./routes/room'))

// Create HTTP server running app, configure socket comms
var http = require('http').Server(app)
var sockets = require('./socketLoader')(http)
sockets.use('./sockets/chat')

// Run the server
http.listen(3000, () => { console.log('Listening on *:3000') })

