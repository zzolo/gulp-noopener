'use strict'

// Dependencies
var test = require('tape')
var gutil = require('gulp-util')
var plugin = require('../index.js')

test('plugin', function (t) {
  t.plan(1)

  var stream = plugin()

  stream.on('data', function (data) {
    t.equal(data.contents.toString(), '<a rel="noopener">thing</a>')
  })

  stream.write(new gutil.File({
    contents: new Buffer('<a>thing</a>')
  }))

  stream.end()
})
