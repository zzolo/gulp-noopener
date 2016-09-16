/**
 * Generic text parser to add rel="noopener"
 */
'use strict'

function overwrite (input) {
  if (typeof input !== "string" || input === null || input === undefined) {
    throw new Error("Input into gulp-noopener must be a string.  Saw: " + input);
  }

  return input.replace(/(<a|<form)([^>]*)(>)/gi, function (match, p1, p2, p3) {
    // Can't get the regex to reject string with opener
    return p2.toLowerCase().indexOf('noopener') !== -1 || p2.toLowerCase().indexOf('target') === -1 ? '' + p1 + p2 + p3 :
      p1 + ' rel="noopener"' + p2 + p3
  })
}

module.exports = overwrite
