/**
 * Gulp plugin to add rel="noopner" to HTML
 */
'use strict'

// Dependencies
var through = require('through2')
var es = require('event-stream')
var gutil = require('gulp-util')
var overwrite = require('./src/overwrite.js')
var warn = require('./src/warn.js')

// Overwrite function
function overwritePlugin () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      // Stream
      file.contents.pipe(es.wait(function (error, body) {
        if (!error) {
          try {
            file.contents = overwrite(body.toString())
          } catch(e) {
            this.emit('error', new gutil.PluginError('gulp-noopener', e, { fileName: file.path }))
            cb(e)
          }
        }

        return cb(error, file)
      }))
    }else {
      // File
      try {
        file.contents = new Buffer(overwrite(file.contents.toString()))
        this.push(file)
      } catch(e) {
        this.emit('error', new gutil.PluginError('gulp-noopener', e, { fileName: file.path }))
        cb(e, file)
      }

      cb()
    }
  })
}

// warn
function warnPlugin () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      // Stream
      file.contents.pipe(es.wait(function (error, body) {
        if (!error) {
          try {
            warnings = warn(body.toString())
            if (warnings) {
              displayWarnings(warnings, file.path)
            }
          } catch(e) {
            this.emit('error', new gutil.PluginError('gulp-noopener', e, { fileName: file.path }))
            return cb(e)
          }
        }

        return cb(error, file)
      }))
    }else {
      // File
      try {
        warnings = warn(file.contents.toString())
        if (warnings) {
          displayWarnings(warnings, file.path)
        }
      } catch(e) {
        this.emit('error', new gutil.PluginError('gulp-noopener', e, { fileName: file.path }))
        cb(e, file)
      }

      cb()
    }
  })
}

// Display warnings
function displayWarnings (warnings, filename) {
  warnings.forEach(function (el) {
    gutil.log(
      gutil.colors.red(relativeFilename(filename)),
      '|',
      gutil.colors.red(el.line + ':' + el.column),
      '|',
      gutil.colors.magenta(el.el[0].name) + ' tag has target attribute but no rel attribute.',
      '\n\n    ',
      el.html,
      '\n\n'
    )
  })
}

// Make filename a little easier
function relativeFilename (filename) {
  return filename ? filename.replace(new RegExp('^' + process.cwd()), '').replace(/^\//, '') : filename
}

module.exports = {
  overwrite: overwritePlugin,
  warn: warnPlugin
}
