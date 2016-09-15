/**
 * Gulp plugin to add rel="noopner" to HTML
 */
'use string'

// Dependencies
var through = require('through2')
var es = require('event-stream')
var gutil = require('gulp-util')
var parser = require('./src/parser.js')

// Plugin function
function plugin () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      // Stream
      file.contents.pipe(es.wait(function (error, body) {
        if (!error) {
          try {
            file.contents = parser(body.toString())
          }
          catch(e) {
            this.emit('error', new gutil.PluginError('gulp-noopener', e, { fileName: file.path }))
            cb(e)
          }
        }

        return cb(error, file)
      }))
    }
    else {
      // File
      try {
        file.contents = new Buffer(parser(file.contents.toString()))
        this.push(file)
      } catch(e) {
        this.emit('error', new gutil.PluginError('gulp-noopener', e, { fileName: file.path }))
        cb(e, file)
      }

      cb()
    }
  })
}

module.exports = plugin
