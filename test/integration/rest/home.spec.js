'use strict'

var request = require('supertest')
var express = require('express')

var app = require(process.cwd() + '/app')

describe('the / route:', () => {
  it('/ renders the home page', done => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })
})

