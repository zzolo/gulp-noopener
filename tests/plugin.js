'use strict'

// Dependencies
var test = require('tape')
var gutil = require('gulp-util')
var plugin = require('../index.js')

// Capture stdout
function capture () {
  var write = process.stdout.write
  var out = ''

  process.stdout.write = function (str) {
    out += str
  }

  return function () {
    process.stdout.write = write
    return out
  }
}

// Warn plugin
/*
test('warn plugin', function (t) {
  t.plan(1)
  var output = capture()

  var stream = plugin.warn()

  stream.on('data', function (data) {
    t.equal(output().indexOf("1:1") !== -1, true)
    t.end()
  })

  stream.write(new gutil.File({
    contents: new Buffer('<a target="_blank">thing</a>')
  }))

  stream.end()
})
*/

test('overwrite plugin', function (t) {
  t.plan(1)

  var tested = false
  var stream = plugin.overwrite()

  stream.on('data', function (data) {
    // Not sure why this gets called multiple times
    if (!tested) {
      t.equal(data.contents.toString(), '<a rel="noopener" target="_blank">thing</a>')
      t.end()
      tested = true
    }
  })

  stream.write(new gutil.File({
    contents: new Buffer('<a target="_blank">thing</a>')
  }))

  stream.end()
})
