'use strict'

// Dependencies
var test = require('tape')
var warn = require('../src/warn.js')

test('warn', function (t) {
  t.plan(11)

  t.throws(warn)
  t.throws(function () {
    warn(2)
  })
  t.throws(function () {
    warn(null)
  })
  t.throws(function () {
    warn(undefined)
  })

  t.equal(warn(''), undefined)
  t.equal(warn(' '), undefined)
  t.equal(warn('abc'), undefined)

  t.equal(warn('<a target="_blank">thing</a>').length, 1)
  t.equal(warn('<a target="_blank">thing</a>')[0].line, 1)
  t.equal(warn('<a target="_blank">thing</a>')[0].column, 1)

  t.equal(warn('<a target="_blank">thing</a><a target="_blank">thing</a><form></form>').length, 2)
})
